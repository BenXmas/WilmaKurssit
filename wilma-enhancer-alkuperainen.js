// ==UserScript==
// @name         Wilma Enhancer (mini)
// @namespace    local.wilma.enhancer
// @version      0.1.0
// @description  Floating toolbox for Wilma: dark mode, compact tables, date highlights, table filter, grade average, CSV export
// @match        https://*.inschool.fi/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/*
 * USAGE
 *  1. Open Wilma, press F12 (or Ctrl+Shift+J) and go to the Console tab.
 *  2. If Chrome asks, type "allow pasting" and press Enter.
 *  3. Paste this whole file and press Enter. A blue gear button appears bottom-right.
 *
 * A console script disappears whenever the page reloads or you navigate. To have it
 * load automatically on every Wilma page, install this same file in Tampermonkey
 * (the header above is already a valid userscript header; edit @match if your Wilma
 * is not on inschool.fi).
 *
 * Console API afterwards:  __wilmaEnhancer.unload()  removes everything.
 */

(() => {
  'use strict';

  const ID = 'we-host';
  const KEY = 'wilmaEnhancer.v1';
  const DAY = 864e5;
  const DEFAULTS = { dark: false, compact: false, dates: false, filters: false, zoom: 100, open: true, x: null, y: null };
  const OPTS = ['dark', 'compact', 'dates', 'filters', 'zoom'];

  // Re-running the script replaces the previous instance.
  if (window.__wilmaEnhancer) {
    try { window.__wilmaEnhancer.unload(); } catch (_) { /* ignore */ }
  }

  // ---------- settings (persisted per site in localStorage) ----------
  let state;
  try { state = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch (_) { state = { ...DEFAULTS }; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { /* ignore */ } };

  // ---------- CSS injection ----------
  // Constructable stylesheets are not blocked by a strict style-src CSP; fall back to <style>.
  function injectCss(target, css) {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
      return () => { target.adoptedStyleSheets = target.adoptedStyleSheets.filter(s => s !== sheet); };
    } catch (_) {
      const el = document.createElement('style');
      el.textContent = css;
      (target === document ? document.head : target).appendChild(el);
      return () => el.remove();
    }
  }

  const removePageCss = injectCss(document, `
    html.we-dark { filter: invert(1) hue-rotate(180deg); background: #fff; }
    html.we-dark img, html.we-dark video, html.we-dark canvas, html.we-dark picture,
    html.we-dark svg image, html.we-dark [style*="background-image"] { filter: invert(1) hue-rotate(180deg); }
    html.we-dark #${ID} { filter: invert(1) hue-rotate(180deg); }

    html.we-compact table td, html.we-compact table th {
      padding-top: 2px !important; padding-bottom: 2px !important; line-height: 1.25 !important;
    }

    .we-today, .we-today > td, .we-today > th { background: rgba(244, 67, 54, .25) !important; font-weight: 600; }
    .we-soon,  .we-soon  > td, .we-soon  > th { background: rgba(255, 193, 7, .30) !important; }
    .we-past { opacity: .5; }

    .we-filter {
      display: block; margin: 6px 0; padding: 4px 8px; font: inherit;
      border: 1px solid #999; border-radius: 4px; width: min(320px, 100%); box-sizing: border-box;
    }
    .we-pick-hover { outline: 3px solid #2196f3 !important; outline-offset: 2px; cursor: crosshair !important; }
    .we-counted { outline: 2px solid #4caf50 !important; outline-offset: -2px; background: rgba(76, 175, 80, .20) !important; }
  `);

  // ---------- helpers ----------
  const inOurUi = el => el && el.closest && el.closest('#' + ID);
  const isLeaf = el => !el.querySelector('table'); // skip layout tables that wrap other tables

  // Finnish grades: 4-10, optionally with + / - / ½ (8+, 9-, 7½) or a decimal (8,5).
  const GRADE_RE = /^(\d{1,2}(?:[.,]\d+)?)\s*([+\-\u2212\u2013]|\u00bd)?$/;
  function gradeValue(text) {
    const m = GRADE_RE.exec(String(text).trim());
    if (!m) return null;
    let v = parseFloat(m[1].replace(',', '.'));
    if (v < 4 || v > 10) return null;
    if (m[2] === '+') v += 0.25;
    else if (m[2] === '\u00bd') v += 0.5;
    else if (m[2]) v -= 0.25;
    return v;
  }

  // First d.m. or d.m.yyyy date in a piece of text. Without a year, picks the nearest sensible one.
  function parseDate(text, today = new Date()) {
    const m = /(?<![\d.])(\d{1,2})\.(\d{1,2})\.(\d{4})?(?!\d)/.exec(text);
    if (!m) return null;
    const day = +m[1], mon = +m[2];
    if (day < 1 || day > 31 || mon < 1 || mon > 12) return null;
    const year = m[3] ? +m[3] : today.getFullYear();
    const d = new Date(year, mon - 1, day);
    if (d.getMonth() !== mon - 1) return null;
    if (!m[3] && d - today < -183 * DAY) d.setFullYear(year + 1);
    return d;
  }

  function tableToCsv(table) {
    const esc = s => '"' + String(s).replace(/\s+/g, ' ').trim().replace(/"/g, '""') + '"';
    // ";" is the delimiter Finnish-locale Excel expects.
    return [...table.rows].map(r => [...r.cells].map(c => esc(c.innerText ?? c.textContent)).join(';')).join('\r\n');
  }

  // ---------- features that touch the page ----------
  function clearDates() {
    document.querySelectorAll('.we-today, .we-soon, .we-past').forEach(el => el.classList.remove('we-today', 'we-soon', 'we-past'));
  }
  function highlightDates() {
    clearDates();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    document.querySelectorAll('tr').forEach(tr => {
      if (!isLeaf(tr) || inOurUi(tr)) return;
      const d = parseDate(tr.textContent, today);
      if (!d) return;
      const diff = Math.round((d - today) / DAY);
      if (diff === 0) tr.classList.add('we-today');
      else if (diff > 0 && diff <= 7) tr.classList.add('we-soon');
      else if (diff < 0) tr.classList.add('we-past');
    });
  }

  const filterBoxes = new Set();
  function addFilters() {
    document.querySelectorAll('table').forEach(table => {
      if (table.__weFilter || !isLeaf(table) || inOurUi(table) || table.rows.length < 8) return;
      const input = document.createElement('input');
      input.type = 'search';
      input.className = 'we-filter';
      input.placeholder = 'Filter rows\u2026';
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        [...table.rows].forEach((tr, i) => {
          if (i === 0 || tr.parentElement.tagName === 'THEAD') return;
          tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
      table.before(input);
      table.__weFilter = input;
      filterBoxes.add({ table, input });
    });
  }
  function removeFilters() {
    filterBoxes.forEach(({ table, input }) => {
      input.remove();
      [...table.rows].forEach(tr => { tr.style.display = ''; });
      delete table.__weFilter;
    });
    filterBoxes.clear();
  }

  const clearMarks = () => document.querySelectorAll('.we-counted').forEach(el => el.classList.remove('we-counted'));

  // "Click a table on the page" picker. Returns a cancel function.
  function pickTable(onPick, onCancel) {
    let hover = null;
    const find = e => (e.target && e.target.closest ? e.target.closest('table') : null);
    const move = e => {
      const t = find(e);
      if (t === hover) return;
      hover && hover.classList.remove('we-pick-hover');
      hover = t;
      hover && hover.classList.add('we-pick-hover');
    };
    const click = e => {
      const t = find(e);
      if (!t) return;
      e.preventDefault(); e.stopPropagation();
      stop();
      onPick(t);
    };
    const key = e => { if (e.key === 'Escape') { stop(); onCancel && onCancel(); } };
    function stop() {
      document.removeEventListener('mousemove', move, true);
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key, true);
      hover && hover.classList.remove('we-pick-hover');
    }
    // Attach on the next tick so the click that started picking is not caught.
    setTimeout(() => {
      document.addEventListener('mousemove', move, true);
      document.addEventListener('click', click, true);
      document.addEventListener('keydown', key, true);
    }, 0);
    return stop;
  }

  // ---------- option appliers ----------
  const apply = {
    dark: on => document.documentElement.classList.toggle('we-dark', !!on),
    compact: on => document.documentElement.classList.toggle('we-compact', !!on),
    zoom: v => { document.body.style.zoom = v === 100 ? '' : String(v / 100); },
    dates: on => (on ? highlightDates() : clearDates()),
    filters: on => (on ? addFilters() : removeFilters()),
  };

  // Wilma swaps content dynamically; re-apply the DOM-based features when it changes.
  let timer;
  const observer = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(refresh, 400); });
  function refresh() {
    observer.disconnect(); // so our own DOM changes don't retrigger us
    if (state.dates) highlightDates();
    if (state.filters) addFilters();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ---------- floating UI (Shadow DOM keeps Wilma's CSS out) ----------
  const host = document.createElement('div');
  host.id = ID;
  host.style.cssText = 'position:fixed;z-index:2147483647;right:16px;bottom:16px;';
  if (state.x != null && state.y != null) {
    host.style.left = state.x + 'px'; host.style.top = state.y + 'px';
    host.style.right = 'auto'; host.style.bottom = 'auto';
  }
  const root = host.attachShadow({ mode: 'open' });
  const removePanelCss = injectCss(root, `
    .wrap { font: 13px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c1b1f; }
    [hidden] { display: none !important; }
    button { font: inherit; cursor: pointer; }
    .fab { width: 44px; height: 44px; border-radius: 50%; border: 0; background: #0b57d0; color: #fff;
           font-size: 22px; box-shadow: 0 2px 10px rgba(0,0,0,.35); touch-action: none; }
    .panel { width: 272px; background: #fff; border: 1px solid #c4c7c5; border-radius: 12px;
             box-shadow: 0 6px 24px rgba(0,0,0,.3); overflow: hidden; }
    .head { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px 8px 14px;
            background: #0b57d0; color: #fff; cursor: move; user-select: none; touch-action: none; }
    .min { background: transparent; border: 0; color: #fff; font-size: 18px; line-height: 1; padding: 0 6px; }
    .body { padding: 10px 14px 12px; display: grid; gap: 8px; }
    .row { display: flex; align-items: center; gap: 8px; }
    .row.col { flex-direction: column; align-items: stretch; gap: 2px; }
    .btns { display: flex; flex-wrap: wrap; gap: 6px; }
    .btns button { flex: 1 1 auto; padding: 6px 8px; border: 1px solid #747775; border-radius: 8px;
                   background: #f8f9fa; color: inherit; }
    .btns button:hover { background: #e8eaed; }
    .out { min-height: 2.6em; padding: 6px 8px; border-radius: 8px; background: #f1f3f4; font-size: 12px; }
    .hint { color: #5f6368; font-size: 11px; }
  `);
  root.innerHTML = `
    <div class="wrap">
      <button class="fab" title="Wilma Enhancer" aria-label="Open Wilma Enhancer">\u2699</button>
      <section class="panel" hidden>
        <header class="head"><strong>Wilma Enhancer</strong>
          <button class="min" data-act="close" title="Minimize" aria-label="Minimize">\u2013</button></header>
        <div class="body">
          <label class="row"><input type="checkbox" data-opt="dark"> Dark mode</label>
          <label class="row"><input type="checkbox" data-opt="compact"> Compact tables</label>
          <label class="row"><input type="checkbox" data-opt="dates"> Highlight dates</label>
          <div class="hint">Rows with a date: today red, next 7 days yellow, past dimmed.</div>
          <label class="row"><input type="checkbox" data-opt="filters"> Filter box on long tables</label>
          <label class="row col"><span>Page zoom: <b class="zv"></b></span>
            <input type="range" min="80" max="140" step="5" data-opt="zoom"></label>
          <div class="btns">
            <button data-act="avg">Average grade\u2026</button>
            <button data-act="csv">Export table\u2026</button>
            <button data-act="clear">Clear marks</button>
          </div>
          <div class="out" aria-live="polite">Press a tool, then click a table on the page.</div>
          <div class="btns"><button data-act="reset">Reset</button><button data-act="unload">Unload</button></div>
        </div>
      </section>
    </div>`;

  const $ = s => root.querySelector(s);
  const fab = $('.fab'), panel = $('.panel'), outEl = $('.out');
  const out = msg => { outEl.textContent = msg; };

  function syncUi() {
    root.querySelectorAll('[data-opt]').forEach(el => {
      const v = state[el.dataset.opt];
      if (el.type === 'checkbox') el.checked = !!v; else el.value = v;
    });
    $('.zv').textContent = state.zoom + '%';
  }
  function clampIntoView() {
    if (state.x == null) return;
    const r = host.getBoundingClientRect();
    host.style.left = Math.max(8, Math.min(r.left, innerWidth - r.width - 8)) + 'px';
    host.style.top = Math.max(8, Math.min(r.top, innerHeight - r.height - 8)) + 'px';
  }
  function setOpen(open) {
    state.open = open; save();
    panel.hidden = !open; fab.hidden = open;
    clampIntoView();
  }
  function set(key, value) {
    state[key] = value; save();
    apply[key](value);
    syncUi();
  }

  // dragging (also distinguishes click from drag on the gear button)
  function makeDraggable(handle, onClick) {
    handle.addEventListener('pointerdown', e => {
      if (e.button !== 0 || (e.target !== handle && e.target.closest('button'))) return;
      const r = host.getBoundingClientRect();
      const dx = e.clientX - r.left, dy = e.clientY - r.top, sx = e.clientX, sy = e.clientY;
      let moved = false;
      handle.setPointerCapture(e.pointerId);
      const move = ev => {
        if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4) return;
        moved = true;
        state.x = Math.min(Math.max(0, ev.clientX - dx), innerWidth - 44);
        state.y = Math.min(Math.max(0, ev.clientY - dy), innerHeight - 44);
        host.style.left = state.x + 'px'; host.style.top = state.y + 'px';
        host.style.right = 'auto'; host.style.bottom = 'auto';
      };
      const up = () => {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        if (moved) save(); else if (onClick) onClick();
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  }
  makeDraggable(fab, () => setOpen(true));
  makeDraggable($('.head'));

  // option inputs
  root.addEventListener('input', e => {
    const key = e.target.dataset && e.target.dataset.opt;
    if (!key) return;
    set(key, e.target.type === 'checkbox' ? e.target.checked : +e.target.value);
    if (key === 'dates' || key === 'filters') refresh();
  });

  // buttons
  let stopPick = null;
  const startPick = (msg, onPick) => {
    stopPick && stopPick();
    out(msg + ' (Esc to cancel)');
    stopPick = pickTable(t => { stopPick = null; onPick(t); }, () => { stopPick = null; out('Cancelled.'); });
  };
  const actions = {
    close: () => setOpen(false),
    clear: () => { clearMarks(); out('Marks cleared.'); },
    avg: () => {
      clearMarks();
      startPick('Click the table that holds your grades\u2026', table => {
        const vals = [];
        table.querySelectorAll('td, th').forEach(c => {
          if (!isLeaf(c)) return;
          const v = gradeValue(c.textContent);
          if (v != null) { vals.push(v); c.classList.add('we-counted'); }
        });
        if (!vals.length) return out('No grades (4\u201310) found in that table.');
        const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
        out(`Average ${mean.toFixed(2)} from ${vals.length} grades (lowest ${Math.min(...vals)}, highest ${Math.max(...vals)}). ` +
            'Green cells were counted \u2013 check that they are all grades.');
      });
    },
    csv: () => {
      startPick('Click the table to export\u2026', table => {
        const blob = new Blob(['\uFEFF' + tableToCsv(table)], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'wilma-table-' + new Date().toISOString().slice(0, 10) + '.csv';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
        out('Exported ' + table.rows.length + ' rows to CSV.');
      });
    },
    reset: () => { OPTS.forEach(k => set(k, DEFAULTS[k])); clearMarks(); refresh(); out('Settings reset.'); },
    unload: () => unload(),
  };
  root.addEventListener('click', e => {
    const btn = e.target.closest && e.target.closest('[data-act]');
    if (btn && actions[btn.dataset.act]) actions[btn.dataset.act]();
  });

  // ---------- teardown ----------
  function unload() {
    observer.disconnect(); clearTimeout(timer);
    stopPick && stopPick();
    clearDates(); removeFilters(); clearMarks();
    document.documentElement.classList.remove('we-dark', 'we-compact');
    document.body.style.zoom = '';
    removePanelCss(); removePageCss();
    host.remove();
    delete window.__wilmaEnhancer;
  }

  // ---------- go ----------
  OPTS.forEach(k => apply[k](state[k]));
  syncUi();
  document.documentElement.appendChild(host);
  setOpen(state.open);
  refresh();

  window.__wilmaEnhancer = { unload, state, set, tools: { gradeValue, parseDate, tableToCsv } };
})();

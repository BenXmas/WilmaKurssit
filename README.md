# 🎓 Wilma Kurssit

> Chrome-laajennus ja konsoliskripti kurssivalintaan Wilmassa.
> Etsii ryhmät, valitsee kurssit ajastetusti tai uudelleen yrittäen ja näyttää, mitkä pakolliset kurssit vielä puuttuvat.

![Versio](https://img.shields.io/badge/versio-1.0.0-2ea44f)
![Kielet](https://img.shields.io/badge/kielet-FI%20%7C%20SV%20%7C%20EN-0969da)
![Selain](https://img.shields.io/badge/selain-Chrome%20%2F%20Edge-d4a72c)

**Tekijä:** BenXmas · **Koodi:** Claude (Anthropic)

---

## 📑 Sisällys

- [Mikä tämä on](#-mikä-tämä-on)
- [Asennus](#-asennus)
- [Ponnahdusikkuna](#-ponnahdusikkuna)
- [Valinta](#-valinta)
- [Silmukka](#-silmukka)
- [Dashboard](#-dashboard)
- [Konsoli](#-konsoli)
- [Asetukset ja kirjautuminen](#-asetukset-ja-kirjautuminen)
- [Vienti](#-vienti)
- [Teema ja kieli](#-teema-ja-kieli)
- [Varoitukset](#-varoitukset)
- [Vianhaku](#-vianhaku)
- [Versiohistoria](#-versiohistoria)
- [Tekijät](#-tekijät)

---

## 💡 Mikä tämä on

Wilma Kurssit vie kurssivalinnasta käsityön pois:

1. 🔍 **Etsii** kurssit valituilta jaksoilta ja näyttää, mistä ryhmästä kukin löytyy.
2. ✅ **Valitsee** kurssit heti, tiettyyn kellonaikaan tai uudelleen yrittäen, kunnes ryhmä vapautuu.
3. 📊 **Näyttää** dashboardilla suoritetut, valitut ja puuttuvat pakolliset kurssit.
4. 📤 **Vie** valinnat PDF- tai tekstitiedostoon.

Työkalu on kahtena muotona:

| Muoto | Milloin | Huomio |
|---|---|---|
| 🧩 **Chrome-laajennus** | Suositus | Latautuu aina itse. Osaa avata lisäikkunan silmukkaa varten. |
| 📜 **Konsoliskripti** (`WKU-v.X.X.X.js`) | Nopea kokeilu | Sama toiminto, mutta ei pysyvää asennusta. Periaatteessa tampermonkey skripti. |

---

## 🛠 Asennus

### Laajennus (suositus)

1. Lataa `WKU-vX.X.X.zip` ( https://github.com/BenXmas/WilmaKurssit/releases releases->uusin) ja pura se kansioon.
2. Avaa Chrome ja mene osoitteeseen `chrome://extensions` tai Edge `edge://extensions`.
3. Kytke **Kehittäjätila** päälle oikeasta yläkulmasta.
4. Valitse **Lataa purettu laajennus** ja valitse purettu kansio.
5. Avaa Wilma ja kirjaudu sisään. Paneeli ilmestyy sivun reunaan.

> [!IMPORTANT]
> Poista vanha laajennus ennen uuden lataamista, jotta kaksi paneelia ei näy päällekkäin.

### Konsoliskripti

1. Avaa Wilma, paina `F12` ja valitse **Console**.
2. Jos Selain pyytää, kirjoita `allow pasting` ja paina Enter.
3. Liitä `WKU-vX.X.X.js` konsoliin ja paina Enter.

Konsoliin liitetty skripti katoaa sivun päivityksessä. Pysyvästi se toimii Tampermonkeyssa, koska tiedoston alussa on valmis userscript-otsake.

### Ensimmäinen käynnistys

1. Valitse lukuvuosi ja tarkista jaksot.
2. Kirjoita kurssikoodit, esim. `MAA02` tai `MAY01.1`.
3. Paina **🔍 Etsi** ja tarkista, että ryhmät löytyivät.
4. Paina **✔ Valitse** tai **🔁 Yritä kunnes kaikki valittu**.

---

## 🪟 Ponnahdusikkuna

Laajennuksen kuvakkeesta avautuu ponnahdusikkuna:

| Asetus | Mitä tapahtuu |
|---|---|
| 🟩 **Paneeli Wilma-sivulla** | Työkalu näkyy pienenä paneelina Wilman sivun reunassa. |
| 🟦 **Erillinen välilehti** | Wilma-sivulle ei piirretä paneelia, vaan työkalu avautuu omaan välilehteensä. |
| ⬜ **Pois päältä** | Laajennus ei piirrä mitään Wilman sivuille. |

Painikkeet:

- **Avaa nyt:** avaa paneelin tai välilehden valitun tilan mukaan.
- **📊 Dashboard:** avaa dashboardin omaan välilehteen.
- **⏹ Lopeta yrittäminen:** pysäyttää silmukat kaikissa Wilma-välilehdissä.

Ponnahdusikkunan alareunassa näkyy versio ja tekijät.

---

## 🎯 Valinta

### 1. Oppilaitokset ja periodit

- **Lukuvuosi:** valitse vuosi ja oppilaitos pudotusvalikosta.
- **Hae uudelleen:** lataa lukuvuodet ja periodit Wilmasta uudelleen.
- **Jaksot:** ruksatut jaksot ovat niitä, joista kursseja etsitään.

### 2. Vuositaso

Vuositason valinta harmaannuttaa ne kurssit, jotka kuuluvat myöhemmälle vuodelle.

| Valinta | Mitä tapahtuu |
|---|---|
| 🌈 Kaikki vuodet | Mikään kurssi ei harmaannu. |
| 1️⃣ 1. vuosi | Myöhempien vuosien kurssit harmaantuvat. |
| 2️⃣ 2. vuosi | Samoin, vuoden 2 kurssien jälkeen. |
| 3️⃣ 3. vuosi | Samoin, vuoden 3 kurssien jälkeen. |

> [!NOTE]
> Vuosijako perustuu Tapiolan lukion ainevalintakorttiin 2026–2027. Harmaan kurssin voi silti valita.(Muille oppilaitoksillekkin toimii, mutta Opintopistelaskuri voi olla epätarkka. Muista aina tarkistaa ettei ole päällekkäisyyksiä tai ettei toinen b periodin kurssi puutu.)

### 3. Kurssilista

Kirjoita koodit kenttään. Erota ne välilyönnillä, pilkulla tai rivinvaihdolla.

| Kirjoitus | Merkitys |
|---|---|
| `MAA02` | Kaikki MAA02-ryhmät. |
| `MAY01.1` | Tietty ryhmä. |
| `MAA02@1b` | Vain jakson 1b ryhmä. |
| `MAA02, FY01, ÄI05` | Useita kursseja kerralla. |

### 4. Napit

| Nappi | Mitä tekee |
|---|---|
| 🔍 **Etsi** | Lukee valitut jaksot. Ei lähetä mitään Wilmaan. |
| ✔ **Valitse** | Lähettää valinnat Wilmaan tai odottaa asetettua kellonaikaa. |
| ✖ **Peruuta** | Pysäyttää haun, odotuksen tai automaattisen valinnan. |
| 🔁 **Yritä kunnes kaikki valittu** | Käynnistää silmukan, ks. [Silmukka](#-silmukka). |

### 5. Taulukko

Taulukossa näkyy jokaiselle koodille löytynyt ryhmä. Jos ryhmiä on useita, valitse oikea vasemmasta valikosta.

### 6. Lisää asetuksia

- **Kellonaika** (tt:mm tai tt:mm:ss): valinta tehdään tähän aikaan. Tyhjä tarkoittaa heti.
- **Päivitä sivu:** päivittää sivun kellonaikana ja valitsee heti latauksen jälkeen. Pidä välilehti auki.
- **Käytä pikavalintaa:** Wilman oma pikavalinta ruksaa valinnat automaattisesti.
- **Automaattinen ryhmien kokoaja:** etsii valituista kursseista sellaisen ryhmäyhdistelmän, jossa ryhmät eivät mene päällekkäin. Katso [Dashboard](#-dashboard).

---

## 🔁 Silmukka

Silmukka yrittää valintaa uudelleen, kunnes kaikki listan kurssit on valittu tai painat **Peruuta**. Täydet ryhmät yritetään joka kierroksella uudelleen.

### Asetukset

| Asetus | Mitä tekee |
|---|---|
| **Välilehtiä** (1–10) | Kuinka monta Wilma-välilehteä ajetaan yhtä aikaa. Enemmän välilehtiä yrittää tiheämmin, mutta ei lisää paikkoja. |
| **Odotus kierrosten välillä (s)** | Kuinka pitkään odotetaan kierrosten välillä. Liian pieni arvo voi johtaa estoon. |
| **Enimmäisaika (min)** | Silmukka pysähtyy itsestään tämän jälkeen. |
| **Lisävälilehdet erilliseen ikkunaan** | Lisävälilehdet avautuvat omaan ikkunaansa, jolloin tämä sivu (ja konsoli) ei päivity. |
| **Jatka onnistumisen jälkeenkin** | Silmukka ei lopu, kun kaikki on valittu. Se tarkistaa, että valinnat pysyvät, ja valitsee uudelleen, jos jokin katoaa. |

### Tavat

Silmukan tavan voi valita **Kehittäjä**-välilehdeltä.

| Tapa | Mitä tekee |
|---|---|
| 🔄 **Päivitys** (perinteinen) | Päivittää sivun joka kierroksella. Oletus. |
| 🪶 **Kevyt** | Lähettää pyynnöt ilman sivun päivitystä. Virtuaaliset työläiset vuorottelevat samassa välilehdessä. |
| ⚡ **Hybridi** | Käyttää kahta lisävälilehteä, joissa kussakin on kolme virtuaalista työläistä. Päivitys tehdään kierroksen jälkeen. |

### Pysähtyminen

Silmukka pysähtyy, kun:

- ✅ kaikki kurssit on valittu (ellei **Jatka onnistumisen jälkeenkin** ole päällä),
- 🚫 Wilma rajoittaa pyyntöjä (HTTP 429),
- 🔐 kirjautuminen vanhenee eikä sitä voi uusia,
- ⏱ enimmäisaika täyttyy,
- ⏹ painat **Peruuta** tai **Lopeta yrittäminen**.

> [!TIP]
> Aloita yhdellä välilehdellä ja tavallisella odotusajalla. Nopeuta vasta, kun tiedät, että se toimii.

### Kaksoislähetyksen esto

Kaksi välilehteä ei lähetä samaa valintaa yhtä aikaa. Laajennus käyttää selaimen **Web Locks** -lukkoa. Jos lukko ei ole käytettävissä, käytetään varamekanismia, joka on hitaampi mutta toimii.

---

## 📊 Dashboard

Dashboard avataan **📊 Dashboard**-napista tai välilehdeltä. Se näyttää yhteenvedon ja kurssilistan.

### Yhteenveto

| Mittari | Mitä se kertoo |
|---|---|
| 📚 **Opintopisteet** | Suoritettujen kurssien op. Lasketaan Wilman suoritustiedoista, kun ne on haettu. Tavoite on lukiossa vähintään 150 op. |
| 🧱 **Pakolliset** | Suoritetut pakolliset op. Pakollisten vähimmäismäärä on 94 op (lyhyt matematiikka) tai 102 op (pitkä). |
| ❗ **Puuttuu** | Pakollisia kursseja, joita ei vielä ole suoritettu tai valittu. |
| 🔢 **Suoritettu / valittu** | Kurssien määrät. |

Kurssi on yksi op-yksikkö kaksi op:ia, ellei asetuksissa toisin. Asetuksen voi muuttaa kurssikohtaisesti.

### Oppiainevalikot

Kurssit on ryhmitelty oppiainekategorioittain, esim. A-kielet, B-kielet, matematiikka ja muut. Jokaisen valikon otsikossa näkyy edistyminen. Valikon voi avata tai sulkea.

### Värit

Legenda näyttää värit aina dashboardin alareunassa. Yleisimmät:

- 🟩 **Vihreä:** suoritettu.
- 🟦 **Sininen:** valittu, ei vielä suoritettu.
- 🟨 **Keltainen:** pakollinen, ei vielä valittu. Keltaisen kurssin voi lisätä valintaan.
- ⬜ **Harmaa:** ei suoritettu eikä valittu.
- 🩶 **Himmeä:** myöhemmän vuositason kurssi.
- ✖ **Yliviivattu:** ohitettu, ei lasketa mukaan.

### Oikea hiiren painike

Kun klikkaat kurssinappia oikealla, aukeaa valikko:

- **Ohita kurssi** tai **Palauta ohitettu kurssi**
- **Merkitse suoritetuksi** tai **Poista suoritusmerkintä**

### Työkalurivi

| Nappi | Mitä tekee |
|---|---|
| 🎯 **Valintamoodi** | Näyttää vain ne aineet, joissa on vielä valittavaa. Keltaisen kurssin klikkaus lisää sen listaan. |
| ➕ **Lisää kaikki keltaiset** | Lisää kaikki keltaiset kurssit valintalistaan. Myöhempien vuosien kurssit ohitetaan. |
| ↻ **Päivitä tiedot** | Hakee jaksot, suoritukset ja HOPSin Wilmasta uudelleen. |
| ▸ **Avaa/sulje kaikki** | Avaa tai sulkee kaikki valikot. |
| 📄 **Vie PDF** | Tallentaa valinnat PDF-tiedostoon. |

### ⚙ Työkalut

- **Hae suoritetut kurssit:** lukee Wilmasta Opinnot → Suoritukset, jolloin suoritetut op tulevat Wilmasta eivätkä ole arvauksia.
- **Hae HOPS:** lukee Opinnot → HOPS -sivun ja näyttää, mitkä valitut kurssit eivät vielä ole HOPSissa. Voit kopioida ne leikepöydälle.
- **Merkitse käsin:** merkitsee koodit suoritetuiksi.
- **Lisää oppiaine:** nimi, koodit ja pakollisten määrä.
- **Piilotetut aineet:** oppiaineen ✕ piilottaa sen. Palautus onnistuu täältä.
- **Palauta oletuslista:** palauttaa alkuperäisen oppiainelistan.

### 🧠 Automaattinen ryhmien kokoaja

Kokoaja hakee valitsemiesi kurssien ryhmät ja rakentaa järjestyksen, jossa ryhmät eivät mene päällekkäin ja ovat tilaa. Kohdassa **Pidä muiden lukioiden jo valitut ryhmät lukittuina** kokoaja ottaa huomioon jo tehdyt valinnat. Tulos näkyy taulukkona, ja **Käytä valinnassa** siirtää sen listaan.

> [!WARNING]
> Tarkista ehdotus aina ennen valintaa. Kokoaja perustuu ryhmien aikatauluihin, ja Wilma tekee lopullisen tarkistuksen.

---

## 🖥 Konsoli

Konsoli näyttää jokaisen pyynnön, jonka työkalu lähettää Wilmalle.

| Merkintä | Merkitys |
|---|---|
| ● | Tämä välilehti lähetti pyynnön. |
| ○ | Toinen välilehti lähetti pyynnön. |
| `GET` | Tietojen haku (esim. jaksot tai suoritukset). |
| `POST` | Kurssin valintapyyntö. |

Jokaisesta rivistä näkyvät kellonaika, statuskoodi ja kesto. Vihreä rivi on onnistunut, punainen epäonnistunut. Napilla **Kopioi** rivit saa leikepöydälle, esim. vianetsintään.

---

## ⚙ Asetukset ja kirjautuminen

### Tallennus

- **Tallenna tiedostoon** tekee tekstitiedoston kurssilistasta ja ryhmävalinnoista. Voit muokata sitä käsin.
- **Lataa tiedostosta** palauttaa tallennetun listan.
- **Lataa asetukset** ja **Tallenna asetukset** käsittelevät koko asetustilan `.json`-tiedostona. Salasanaa ei tallenneta tiedostoon.

### Tunnukset

| Asetus | Mitä tekee |
|---|---|
| **Käyttäjätunnus ja salasana** | Tallennetaan vain tähän selaimeen, jos valitset **Muista tässä selaimessa**. |
| **Kirjaudu automaattisesti uudelleen** | Täyttää kirjautumislomakkeen, kun istunto päättyy. |
| **Pidä istunto auki (tarkistus 4 min välein)** | Tarkistaa istunnon säännöllisesti, ettei se vanhene kesken valinnan. |

> [!CAUTION]
> Salasana lähetetään vain Wilman omaan kirjautumislomakkeeseen. Älä jaa tallennettua asetustiedostoa, vaikka se ei sisältäkään salasanaa, jos et tiedä, mitä siinä on.

---

## 📤 Vienti

Vienti-välilehdellä on kaikki vientivaihtoehdot yhdessä paikassa.

| Nappi | Sisältö |
|---|---|
| 📄 **Vie PDF** | Värillinen yhteenveto: suoritetut ja valitut kurssit oppiaineittain sekä kurssilista ryhmineen. |
| 💾 **Tallenna tiedostoon** | Kurssilista ja ryhmävalinnat tekstitiedostona. |
| ⚙ **Tallenna asetukset** | Koko asetustila `.json`-tiedostona. |
| 📋 **Kopioi kurssilista** | Kurssikoodit leikepöydälle. |
| 🐞 **Vianetsintätiedot** | Raportti ongelmatilanteisiin, ei salasanoja. |

Tuonti: **Lataa tiedostosta** palauttaa tekstitiedoston, ja **Lataa asetukset** palauttaa asetukset `.json`-tiedostosta.

> [!NOTE]
> PDF tukee länsimaisia merkkejä. Harvinaisemmat merkit voivat näkyä väärin.

---

## 🎨 Teema ja kieli

- **Teema:** vaalea, tumma tai lo-fi. Oletuksena teema seuraa järjestelmää, kunnes vaihdat sen itse.
- **Kieli:** suomi, ruotsi tai englanti. Kieli vaihtuu heti koko käyttöliittymässä.
- **Paneeli:** siirrä otsikosta. Kulmasta voit muuttaa kokoa.

---

## ⚠️ Varoitukset

> [!CAUTION]
> **IP-esto.** Wilma voi rajoittaa pyyntöjä tai estää IP-osoitteesi, jos pyyntöjä tulee liian tiheästi. Nopeat asetukset ovat omalla vastuulla.

> [!WARNING]
> **Kehittäjä-välilehti.** Silmukan tavat ja nopeusasetukset ovat kokeellisia. Arvot alle 0,3 s avautuvat vain valinnalla **Ymmärrän riskin: avaa 5–200 ms:n arvot**.

> [!IMPORTANT]
> **Tarkista valinnat Wilmasta.** Työkalu ei korvaa Wilman omaa tarkistusta.

Tämä työkalu ei ole Wilman tai sen kehittäjien virallinen tuote. Käyttö on omalla vastuulla.

---

## 🩺 Vianhaku

| Oire | Mitä kokeilla |
|---|---|
| 🔘 Napit eivät reagoi | Päivitä sivu (F5) ja varmista, että olet Wilman sivulla. |
| 📅 Lukuvuosia ei löydy | Paina **Hae uudelleen**. |
| 🔑 Valinta ei onnistu formkey-virheellä | Kirjaudu Wilmaan uudelleen ja päivitä sivu. |
| 🚫 Silmukka pysähtyi (429) | Odota hetki ja nosta odotusaikaa. |
| 🔐 Kirjautuminen ei onnistu | Tarkista tunnukset ja että automaattinen kirjautuminen on päällä. |
| 🧩 Vanha versio näkyy | Poista vanha laajennus ja lataa uusi. |

Kun ilmoitat ongelmasta, liitä **Vianetsintätiedot**. Tarkista se ennen jakamista.

---

## 🏷 Versiohistoria

Versioiden puutteellinen kokoelma (0.1.0-0.32.1 Prerelease/Alpha) on erillisessä kansiossa (Välivaiheet) käytä kansion tulkintaan SISALTO.md tekstitiedostoa. Tässä tärkeimmät vaiheet:

| Versio | Muutos |
|---|---|
| **🏁 1.0.0** | Ensimmäinen julkaisu. Versio näkyy dashboardilla ja ponnahdusikkunassa. Tekijätiedot lisätty. CSV-vienti poistettu. |
| 0.32.1 | Vienti-välilehden napit näkyvät tummassa teemassa. |
| 0.32.0 | Uusi PDF ja Vienti-välilehti. |
| 0.30.0 | Opintovuosi-valinta Tapiolan lukion ainevalintakortin mukaan. |
| 0.29.1 | Yksinkertaisempi valintasivu. |
| 0.29.0 | Nopea pyyntöpolku ja kaksoislähetyksen esto. |

Versio 1.0.0 on testattu oikeassa Wilmassa versiolla 0.32.1. Muutokset 1.0.0:aan ovat versionumero, tekijätiedot ja CSV-vienti poistettu.

---

## 👥 Tekijät

| Rooli | Kuka |
|---|---|
| 💡 Idea, debug ja testaus oikeassa Wilmassa | **BenXmas** |
| 🛠 Koodi ja dokumentaatio | **Claude Sonnet 5.5 (Anthropic)** |

---

<sub>Tehty kurssivalintaan. Palautteet ja bugiraportit ovat tervetulleita pull requesteina.</sub>

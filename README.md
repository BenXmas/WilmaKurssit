# Wilma Kurssit – kaikki versiot

Tämä kansio sisältää Wilma Kurssit -työkalun kaikki versiot, joista on tallessa tiedosto, sekä välivaiheet niiden välillä.

## Sisällys

- [Versionumerot](#versionumerot)
- [Vaiheet: alpha ja release](#vaiheet-alpha-ja-release)
- [Versiohistoria](#versiohistoria)
- [Mitä ei ole tallessa](#mitä-ei-ole-tallessa)
- [Kansiorakenne](#kansiorakenne)

## Versionumerot

Versio on muotoa `Vx.y.z`:

| Luku | Mitä se tarkoittaa |
|---|---|
| **x** (ensimmäinen) | Iso uusi ominaisuus. Alphassa pysyy 0:na, ja nousee 1:een julkaisussa. |
| **y** (toinen) | Pienemmät muutokset ja parannukset. Alphassa myös uudet ominaisuudet. |
| **z** (kolmas) | Virheenkorjaus. |

## Vaiheet: alpha ja release

- **Alpha** (nyt): versio alkaa `0`. Skriptia ei ole vielä testattu oikeassa Wilmassa alusta loppuun.
- **Release `1.0.0`** julkaistaan, kun kaikki kolme täyttyvät:
  1. Kirjautuminen, haku ja valinta on testattu oikeassa Wilmassa, ja valinta näkyy Wilmassa.
  2. Ei tunnettuja virheitä, jotka estävät käytön.
  3. Käyttöohjeessa kerrotaan, että liian nopea käyttö voi johtaa Wilman estoon, ja miten nopeutta säädetään.

Tilanne nyt: kohta 1 ei täyty, joten versiot ovat alphaa.

## Versiohistoria

| Versio | Tyyppi | Mitä muuttui |
|---|---|---|
| V0.32.1 | Virheenkorjaus | Vienti-välilehden napit ja selitteet näkyvät tummassa teemassa. |
| V0.32.0 | Uusi ominaisuus | Uusi PDF (Inter-fontti, värit, edistymispalkit). Vienti-välilehti: PDF, CSV, tekstitiedosto, asetukset, kurssilistan kopiointi, vianetsintä ja tuonti. |
| V0.31.0 | Uusi ominaisuus | Dashboardin kurssit omiin valikkoihin kurssityypeittäin. Ensimmäinen PDF-vienti. |
| V0.30.1 | Uusi ominaisuus | Vuositaso valintasivulla ja dashboardilla. Myöhempien vuosien kurssit harmaantuvat. |
| V0.30.0 | Uusi ominaisuus | Opintovuosi-valinta ja "Lisää kurssit" Tapiolan lukion valintakortin 2026–2027 mukaan. |
| V0.29.1 | Pieni parannus | Kevyempi valintasivu. Kellonaika ja päivitys siirrettiin "Lisää asetuksia" -osioon, ja selitteet lyhenivät. |
| V0.29.0 | Pieni parannus (nopeus) | Nopeampi pyyntöpolku: valinnat lähtevät heti viimeisimmästä hausta. Sama valinta ei lähde kahdesti. |
| V0.28.0 | Uusi ominaisuus | Piilotetut oppiaineet säilyvät, ja Dashboardin Työkalut-valikossa on palautusvalikko. |
| V0.27.0 | Uusi ominaisuus | Yläpalkissa kuusi välilehteä: Valinta, Dashboard, Silmukka, Konsoli, Asetukset ja Kehittäjä. |
| V0.26.0 | Pieni parannus | Siivottu CSS ja kevyempi dashboard silmukan aikana. Toiminta ennallaan. |
| V0.25.0 | Uusi ominaisuus | Silmukan välilehdet avautuvat omaan ikkunaan. Konsolisivu ei enää päivity. |
| V0.24.0 | Uusi ominaisuus | Istunto pidetään auki 4 minuutin välein. Automaattinen kirjautuminen hoitaa loput. |
| V0.23.0 | Uusi ominaisuus | Kirjautumiskenttä, automaattinen kirjautuminen ja kehittäjäasetus viiveelle (ms). |
| V0.1.0 | Lähtökohta | Alkuperäinen Wilma Enhancer (mini) -skripti. |

**Huomio numeroista.** Versiot 0.29.1 ja 0.30.1 numeroitiin ennen tätä sääntöä. Ne ovat pieniä parannuksia tai uusia ominaisuuksia, mutta numero päättyy korjausluvulle. Numerot on pidetty ennallaan, koska versioita on jo jaettu.

## Mitä ei ole tallessa

| Versiot | Syy |
|---|---|
| V0.2.0–V0.22.0 | Toimitettuja tiedostoja ei ole. Välivaiheet löytyvät kansiosta `valivaiheet/`, mutta niitä ei voi varmasti yhdistää yksittäisiin versioihin. |
| V0.23.0–V0.27.0 | Tiedostokopioita ei ole. Muutokset on kuvattu yllä. |

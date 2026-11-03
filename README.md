# Wilma-kurssivalitsin

> Chrome-laajennus ja konsoliskripti, joka nopeuttaa kurssivalintaa Wilmassa,
> kokoaa ryhmät automaattisesti ja seuraa HOPSin etenemistä.

![Versio](https://img.shields.io/badge/versio-1.0.0-blue)
![Kielet](https://img.shields.io/badge/kielet-FI%20%7C%20EN%20%7C%20SV-green)
![Selain](https://img.shields.io/badge/selain-Chrome%20%2F%20Edge-orange)

**Tekijä:** BenXmas · **Koodi:** Claude (Anthropic)

---

## Sisällysluettelo

- [Mikä tämä on](#mikä-tämä-on)
- [Ominaisuudet lyhyesti](#ominaisuudet-lyhyesti)
- [Asennus](#asennus)
- [Käyttö](#käyttö)
  - [Paneeli ja koko näkymä](#paneeli-ja-koko-näkymä)
  - [Valinta](#valinta)
  - [Dashboard](#dashboard)
  - [Silmukka](#silmukka)
  - [Konsoli](#konsoli)
  - [Asetukset](#asetukset)
  - [Kehittäjä](#kehittäjä)
  - [Vienti](#vienti)
- [Automaattinen kirjautuminen ja istunto](#automaattinen-kirjautuminen-ja-istunto)
- [Synkronointi välilehtien välillä](#synkronointi-välilehtien-välillä)
- [Teema ja kielet](#teema-ja-kielet)
- [Miten valinta teknisesti etenee](#miten-valinta-teknisesti-etenee)
- [Turvallisuus ja riskit](#turvallisuus-ja-riskit)
- [Tunnetut rajoitukset](#tunnetut-rajoitukset)
- [Vianetsintä](#vianetsintä)
- [Versiohistoria](#versiohistoria)
- [Tekijät](#tekijät)
- [Kiitokset](#kiitokset)

---

## Mikä tämä on

Wilma-kurssivalitsin on työkalu, joka auttaa lukion kurssivalinnoissa. Se

1. lukee Wilman kurssitarjottimen ja löytää kursseille oikeat ryhmät,
2. valitsee kurssit puolestasi joko heti, tarkalla kellonajalla tai
   uudelleenyrkivässä silmukassa,
3. kokoaa ryhmäyhdistelmän, joka välttää päällekkäiset palkit ja täynnä
   olevat ryhmät,
4. näyttää dashboardilla, mitä olet suorittanut, mitä valinnut ja mitä
   pakollisia kursseja vielä puuttuu,
5. vie valinnat PDF-, CSV- ja tekstitiedostoon.

Työkalu toimii kahdessa muodossa:

| Muoto | Käyttötarkoitus |
|---|---|
| **Chrome-laajennus** | Suositeltu. Latautuu automaattisesti, voi avata lisävälilehdet ja synkronoida välilehdet. |
| **Konsoliskripti** (`wilma-kurssit.js`) | Nopea kokeilu ilman asennusta. Osa toiminnoista (lisävälilehdet, tausta-ajo) on rajoitettu. |

---

## Ominaisuudet lyhyesti

| Ominaisuus | Missä | Lyhyt kuvaus |
|---|---|---|
| Kurssien haku | Valinta | Lukee valitut jaksot ja listaa löytyneet ryhmät. Ei lähetä valintoja. |
| Valinta | Valinta | Lähettää valinnat Wilmalle. Voi ajastaa ja toistaa. |
| Vuositaso | Valinta, Dashboard | Harmaannuttaa myöhemmän vuoden kurssit. |
| Kurssikohtainen jaksorajaus | Valinta | `MAA02@1b` valitsee vain 1. periodin b ryhmän. |
| Silmukka | Silmukka | Yrittää uudelleen, kunnes kaikki on valittu tai pysäytät. |
| Hybridi | Silmukka | Kaksi lisävälilehteä, kolme virtuaalivalitsijaa kussakin. |
| Erillinen ikkuna | Silmukka | Työvälilehdet omaan ikkunaan, jotta dashboard pysyy käytettävänä. |
| Dashboard | Dashboard | Oppiainekortit, pakolliset, edistyminen, värikoodit. |
| Ryhmien kokoaja | Dashboard | Kokoaa parhaan ryhmäyhdistelmän automaattisesti. |
| Automaattinen kirjautuminen | Asetukset | Täyttää kirjautumislomakkeen, jos istunto vanhenee. |
| Istunnon ylläpito | Asetukset | Pitää istunnon auki 20 minuutin aikakatkaisun yli. |
| Konsoli | Konsoli | Näyttää jokaisen lähetetyn pyynnön ja tapahtuman. |
| Vienti | Vienti | PDF, CSV, TXT, JSON, leikepöytä, vianetsintätiedot. |
| Synkronointi | Kaikki | Asetukset päivittyvät reaaliajassa välilehdestä toiseen. |
| Teema | Kaikki | Vaalea, tumma ja lo-fi-ilme. |
| Kielet | Kaikki | Suomi, englanti, ruotsi. |

---

## Asennus

### Laajennus (suositus)

1. Lataa `wilma-kurssit-extension.zip` ja pura se kansioon.
2. Avaa Chrome ja mene osoitteeseen `chrome://extensions`.
3. Kytke **Developer mode** päälle oikeasta yläkulmasta.
4. Valitse **Load unpacked** ja valitse purkamasi kansio.
5. Avaa Wilma ja kirjaudu sisään. Paneeli ilmestyy oikeaan alakulmaan.

> **Päivitys:** poista vanha laajennus ennen uuden lataamista, ettei kaksi
> paneelia tule päällekkäin. Tallennettu tila säilyy, koska se on selaimen
> muistissa eikä laajennuksen kansiossa.

### Konsoliskripti

1. Avaa Wilma.
2. Paina `F12` ja valitse **Console**.
3. Jos Chrome pyytää, kirjoita `allow pasting` ja paina Enter.
4. Liitä `wilma-kurssit.js` kokonaan ja paina Enter.

Konsoliskripti katoaa sivun päivityksessä. Jos haluat sen latautuvan
automaattisesti, asenna sama tiedosto Tampermonkeyhin — tiedoston alussa on
valmis userscript-otsake.

### Ensimmäinen käynnistys

1. Valitse lukuvuosi ja tarkista, että jaksot ovat oikein rastitettu.
2. Kirjoita kurssikoodit (esim. `MAA02`, `ÄI05@1a`).
3. Paina **Etsi** ja tarkista, että ryhmät löytyivät.
4. Paina **Valitse** tai **Yritä kunnes kaikki valittu**.

---

## Käyttö

### Paneeli ja koko näkymä

- **Paneeli** on pieni, vedettävä ja kooltaan muutettava ikkuna Wilma-sivun
  reunassa. Vetämällä oikean alakulman kahvasta voit muuttaa kokoa, ja
  kaksoisklikkaus palauttaa oletuskoot. Koko ja paikka muistetaan.
- **Koko näkymä** avautuu omalle välilehdelleen laajennuksen kuvakkeesta tai
  paneelin otsikon painikkeesta. Siinä on välilehdet: Valinta, Dashboard,
  Silmukka, Konsoli, Asetukset, Kehittäjä ja Vienti.

Jokaisella välilehdellä on oma osoite (esim. `#wk-full-con`), joten laajennus
voi avata suoraan oikean välilehden.

### Valinta

**Lukuvuosi ja jaksot.** Yläreunassa on lukuvuosivalikko, johon on ryhmitelty
kaikki valintasivulla listatut koulut. Jaksojen valintaruudut tulevat
automaattisesti: avoimet jaksot ovat valittuina ja päättyneet tyhjinä
merkinnällä *(päättynyt)*. Voit valita usean koulun jaksoja yhtä aikaa, ja
valitut jaksot säilyvät koulua vaihtaessa.

**Vuositaso.** Pudotusvalikossa on *Kaikki vuodet*, *1. vuosi*, *2. vuosi*,
*3. vuosi (abi)* ja *4. vuosi (yli-abi)*. Valinta harmaannuttaa ne kurssit,
jotka Tapiolan lukion valintakortin mukaan kuuluvat myöhemmälle vuodelle.
Harmaannetun kurssin voi silti valita. Vuositaso on sama valinta- ja
dashboard-sivulla.

**Kurssilista.** Kirjoita kurssit yhdelle riville tai usealle. Muodot:

| Muoto | Merkitys |
|---|---|
| `MAA02` | Kaikki MAA02-ryhmät, valitsee sopivimman. |
| `MAA02.1` | Tietty ryhmä. |
| `MAA02@1b` | Vain 1. periodin b ryhmä. |
| `MAA02, FY01, ÄI05` | Useita kursseja. |

**Etsi** lukee valitut jaksot eikä lähetä mitään. Se näyttää jokaisesta
kurssista löytyneet ryhmät, opettajan ja tilan (vapaa, täynnä, suoritettu,
valittu, päättynyt). Lyhyelle koodille avautuu pudotusvalikko, josta valitset
ryhmän.

**Valitse** lähettää valinnat. Jo valittuja ei lähetetä uudelleen. Jos olet
asettanut kellonajan ja *Päivitä sivu* -valinnan, sivu päivittyy juuri sillä
sekunnilla ja valinta tehdään heti latauksen jälkeen.

**Yritä kunnes kaikki valittu** käynnistää silmukan, joka päivittää sivun ja
yrittää uudelleen, kunnes kaikki listan kurssit on valittu tai pysäytät sen.

Kellonaika, päivitysvalinta ja muut harvemmin tarvittavat asetukset ovat
**Lisää asetuksia** -osiossa.

### Dashboard

**Yhteenveto.** Yläreunassa on suoritettujen kurssien määrä, valittujen määrä
ja puuttuvien pakollisten määrä. Lisäksi näkyy opintopisteet: Wilman mukaan
saadut pisteet ja erikseen valittujen pisteet. Suoritetut ja valitut lasketaan
eri lukuihin — niitä ei enää sekoiteta keskenään.

**Oppiainekortit.** Jokainen oppiaine on oma avattava korttinsa, jossa on
edistymispalkki ja kurssikoodit. Kortin otsikossa näkyy esimerkiksi `4/6`.

**Värikoodit.**

| Väri tai merkki | Merkitys |
|---|---|
| Vihreä | Suoritettu |
| Sininen | Valittu |
| Harmaa | Ei suoritettu eikä valittu |
| Keltainen | Pakollinen, puuttuu ja on tarjolla avoimessa jaksossa |
| Violetti reuna | Pakollinen kurssi |
| Pinkki reuna | Valinnainen kurssi |
| Pisteviiva | Kurssi on merkitty käsin suoritetuksi |
| Yliviivaus | Kurssi on ohitettu (ei lasketa mihinkään) |
| ★ | Kurssi on HOPSissa |
| Harmaana | Kurssi kuuluu myöhemmälle vuositasolle |

**Työkalut-valikko.** Harvemmin tarvittavat toiminnot ovat ⚙-valikon takana:
koodien merkintä käsin, oman oppiaineen lisäys, oletuslistan palautus,
opintopisteet per kurssi, ohitetut kurssit ja **piilotetut aineet**.

**Piilotetut aineet.** Oppiaineen ✕ ei poista ainetta vaan piilottaa sen.
Piilotetut löytyvät valikosta *Piilotetut aineet (n)*, jossa on *Palauta
valittu* ja *Palauta kaikki*. Palautettu aine palaa entiselle paikalleen ja
säilyttää vaatimusmääränsä.

**Uusien kurssien valintamoodi.** 🎯-nappi piilottaa jo suoritetut ja valitut
kurssit. Jäljelle jäävät keltaiset eli pakolliset, jotka puuttuvat ja ovat
tarjolla. Keltaista kurssia klikkaamalla se lisätään valintalistaan, ja
*Siirry valintaan* vie takaisin Valinta-välilehdelle.

**Ryhmien automaattinen kokoaja.** Valitse lukio, haluamasi kurssit ja
halutessasi kursseja muista lukioista. Skripti hakee kaikki ryhmät ja kokoaa
yhden ryhmän per kurssi. Se välttää kaksi ryhmää samassa palkissa (sama aika)
ja täynnä olevat ryhmät. Muiden lukioiden kurssit ratkaistaan ensin, ja oman
lukion kurssit sovitetaan niiden ympärille. Tuloksen voi viedä valintaan
*Käytä*-napilla.

### Silmukka

| Tapa | Mitä tekee |
|---|---|
| **Fetch** | Hakee ja lähettää pyynnöt ilman sivun päivitystä. Kevyin. |
| **Reload** | Päivittää sivun kierrosten välissä. |
| **Hybridi** | Avaa kaksi lisävälilehteä, kolme virtuaalivalitsijaa kussakin, ja päivittää kierroksen jälkeen. |
| **Kevyt, ei päivityksiä** | Vuorottelee 1–6 virtuaalivalitsijaa yhdessä välilehdessä. |

**Erillinen ikkuna.** Kun asetus on päällä, silmukan välilehdet avautuvat
omaan ikkunaansa ja dashboard pysyy paikallaan eikä päivity. Tämä on
oletuksena päällä.

**Asetukset.** Välilehtien määrä (1–10), odotus kierrosten välillä,
enimmäisaika ja *Jatka onnistumisen jälkeenkin*.

**Pysäytys.** 🔁-nappi muuttuu käynnissä punaiseksi. Yhden välilehden pysäytys
pysäyttää kaikki saman Wilman välilehdet ja sulkee laajennuksen avaamat
lisävälilehdet.

**Turvarajat.** Silmukka pysähtyy itse, jos Wilma vastaa HTTP 429, jos
kirjautuminen vanhenee eikä automaattinen kirjautuminen ole päällä, tai jos
lista on tyhjä. `srvError("Valintaa ei voi muuttaa")` tulkitaan virheeksi, ja
silmukka yrittää kurssia uudelleen.

**Kaksoislähetyksen esto.** Kaksi välilehteä ei voi lähettää samaa valintaa
yhtä aikaa. Laajennuksessa esto käyttää selaimen Web Locks -lukkoa; ilman
tukea käytetään löysempää varamekanismia.

### Konsoli

Jokaisella rivillä on kellonaika, lähde, GET tai POST, tilakoodi, kesto ja
polku. ● tarkoittaa tätä välilehteä ja ○ toista välilehteä.

| Tyyppi | Merkitys |
|---|---|
| `LOAD` | Sivu latautui, tila ja silmukan tila. |
| `ROUND` | Kierros alkoi, välilehden paikka ja aloitusaika. |
| `TURN` | Virtuaalivalitsijan tulos: valitsemattomat, lähetetyt, virheet. |
| `REFRESH` | Sivu päivitetään ja syy. |
| `KEEP` | Dashboard-välilehti jatkaa ilman päivitystä. |
| `CLAIM` | Toinen välilehti ehti lähettää saman valinnan. |
| `TABS` | Lisävälilehdet avattiin. |
| `STOP` | Silmukka pysähtyi ja syy. |
| `LIMIT` | Wilma rajoitti (429). |
| `LOGIN` | Kirjautuminen vanheni. |

*Vain POST* näyttää vain valintapyynnöt. *Tauko* pysäyttää päivityksen.
*Tyhjennä* tyhjentää listan. *Kopioi* kopioi näkyvät rivit leikepöydälle.

Konsoli piirtyy enintään neljä kertaa sekunnissa ja kevyessä tilassa kerran.

### Asetukset

**Tallennus.** *Tallenna*-painike tekee luettavan tekstitiedoston
`wilma-kurssit-PVM.txt`. Siinä on jaksot ja kurssit valintoineen, ja voit
muokata sitä käsin — `#`-alkuiset rivit ohitetaan. *Lataa* lukee tiedoston ja
palauttaa kurssit, jaksot, rajaukset ja valitut ryhmät. Myös vanhat
`.json`-tiedostot latautuvat.

**Kaikki asetukset.** *Tallenna-painikkeen* vieressä on *Kaikki asetukset* ja
*Lataa asetukset*. Ne sisältävät kaikki valinnat, teeman, kielen ja
dashboardin asetukset. Salasana ei koskaan päädy tähän tiedostoon.

**Tunnukset ja automaattinen kirjautuminen.** Käyttäjätunnus ja salasana
tallennetaan oletuksena vain tämän välilehden muistiin. *Muista tässä
selaimessa* -valinta säilyttää ne selaimessa. Salasana lähetetään vain Wilman
omaan kirjautumislomakkeeseen. Jos Wilma pyytää uuden kirjautumisen,
laajennus täyttää lomakkeen ja lähettää sen. Yritys tehdään enintään kerran
kahdessa minuutissa, ja kaksi peräkkäistä epäonnistumista pysäyttää
automaattisen kirjautumisen 15 minuutiksi.

**Istunnon ylläpito.** *Pidä istunto auki* tekee taustapyynnön valintasivulle
4 minuutin välein. Kun useita välilehtiä on auki, vain yksi tekee tarkistuksen.

**Kevyt tila.** ⚡ vähentää animaatioita ja piirtää harvemmin.

**Pikavalinta.** Laajennus ruksaa Wilman oman *Käytä pikavalintaa* -ruudun
automaattisesti kerran sivulatausta kohden.

### Kehittäjä

Kehittäjä-välilehti on tarkoitettu kokeiluun, ja siinä on punainen varoitus.

**Varoitus.** Nopeat välit voivat saada Wilman rajoittamaan pyyntöjäsi tai
estämään IP-osoitteesi. Käyttö on omalla vastuulla. Silmukka pysähtyy
automaattisesti HTTP 429 -vastaukseen.

**Väli millisekunteina.** Kenttä *Väli käsittelijöiden välillä (ms)*. Arvo 0
tarkoittaa automaattista laskentaa. Alaraja on 5 ms, ja se vaatii erillisen
riskirastin. Ilman rastia alaraja on 300 ms.

**Silmukkatapa ja virtuaalivalitsijat.** Hybridin valitsijoiden määrä ja
kevyen tilan virtuaalivalitsijoiden määrä.

### Vienti

| Vienti | Sisältö |
|---|---|
| **PDF** | Värillinen yhteenveto: otsikkopalkki, kolme yhteenvetolaatikkoa, oppiaineet edistymispalkkeineen ja kurssilista taulukkona. Inter-fontti on upotettu. |
| **CSV** | Kaikki kurssit tilan, vuositason ja pakollisuuden kanssa. Puolipiste erottimena, joten se aukeaa suomalaisessa Excelissä. |
| **Tekstitiedosto** | Sama luettava muoto kuin *Tallenna*-painikkeessa. |
| **Asetukset (.json)** | Kaikki asetukset. Ei salasanaa. |
| **Kopioi kurssilista** | Kurssikoodit leikepöydälle. |
| **Vianetsintätiedot** | Rakennetietoja sivusta vianetsintää varten. Ei salasanoja eikä tunnisteita. |

PDF käyttää vain latinalaisia kirjaimia, joten kurssinimien muut erikoismerkit
(esim. kyrilliset) näkyvät kysymysmerkkeinä.

---

## Automaattinen kirjautuminen ja istunto

1. **Istunnon ylläpito** lukee valintasivun 4 minuutin välein.
2. **Automaattinen kirjautuminen** täyttää ja lähettää kirjautumislomakkeen,
   jos Wilma näyttää sen kesken kaiken.
3. **Jäähdytys** estää toistuvat yritykset väärällä salasanalla.

Kaksivaiheista tunnistautumista (2FA) ei tueta.

---

## Synkronointi välilehtien välillä

Kaikki auki olevat Wilma-välilehdet jakavat samat asetukset reaaliajassa:
kurssilista, refresh-valinta ja aloitusaika, odotusaika, jatkaminen,
välilehtien määrä, enimmäisaika, pikavalinta, kevyt tila, ohjeiden näyttö,
teema, kieli, jaksojen rastit, dashboardin tiedot ja kehittäjäasetukset.

Välilehtikohtaisia ovat paneelin paikka ja koko, auki/kiinni-tila, valittu
lukuvuosi sekä käynnissä oleva ajastus. Ajastus on tarkoituksella
välilehtikohtainen, ettei kaikki välilehdet lähetä valintaa samalla hetkellä.

---

## Teema ja kielet

- **Teema:** vaalea, tumma ja lo-fi. Oletuksena teema seuraa järjestelmää.
- **Kielet:** suomi, englanti ja ruotsi. Kieli vaihtuu otsikon painikkeesta ja
  koskee koko käyttöliittymää, ohjeita, dashboardia ja ponnahdusikkunaa.

---

## Miten valinta teknisesti etenee

1. **Valintasivu.** Työkalu lukee osoitteen `/selection/view`, jossa on
   lukuvuosien otsikot ja jaksolistat. Jaksojen linkit sisältävät ryhmän
   tunnisteen, esimerkiksi `19221C2A_32086`.
2. **Jaksosivu.** Jokaisella jaksolla on oma sivunsa, jossa kurssilinkit ovat
   muotoa `<a href="..._33936" class="k...-off">ÄI05.1</a>`. Luokka kertoo
   tilan: `-off` on vapaa, `-on` valittu, `disa` täynnä tai estetty, `suor-on`
   suoritettu.
3. **Lomakeavain.** Jokaisella sivulla on `input[name="formkey"]`, joka
   lähetetään mukana POST-pyynnössä.
4. **Valinta.** Valinta lähetetään POST-pyyntönä ryhmän tunnisteella. Virhe
   voi tulla HTTP 200:n sisällä, esimerkiksi `srvError("Valintaa ei voi
   muuttaa")`.
5. **Palkki.** Kurssilinkit ovat `li.palkki`-lohkojen sisällä, ja samassa
   palkissa olevat kurssit ovat samassa aikaikkunassa.
6. **Varmistus.** Silmukka lukee kierroksen lopussa tarjottimen tilan, joten
   onnistuminen todetaan Wilman omasta merkinnästä.

---

## Turvallisuus ja riskit

- **IP-esto.** Wilma voi rajoittaa pyyntöjä tai estää IP-osoitteen, jos
  pyyntöjä tulee liian tiheästi. Kehittäjäasetusten nopeat välit (5–300 ms)
  lisäävät riskiä merkittävästi. Käytä niitä vain, jos ymmärrät riskin.
- **429-vastaus.** Silmukka pysähtyy itsestään.
- **Salasana.** Lähetetään vain Wilman omaan lomakkeeseen, ei asetustiedostoon.
- **Väärä salasana.** Automaattinen kirjautuminen jäähtyy 15 minuutiksi
  kahden epäonnistumisen jälkeen.
- **Vianetsintätiedot.** Raportti korvaa koulun istuntotunnisteen `!SLUG`-
  merkinnällä eikä sisällä salasanaa tai lomakeavainta. Tarkista se silti
  ennen lähettämistä.

---

## Tunnetut rajoitukset

- **Ei päällekkäisyystarkistusta valinnassa.** Wilma tarkistaa itse.
- **LOPS-luvut ovat suuntaa-antavia.** Perustuvat lukion tuntijakoon (asetus
  810/2018) ja yhteen opinto-oppaaseen. Tarkista omasta opinto-oppaastasi.
- **Opintopisteet.** Jos Wilman omaa pistemäärää ei löydy, arvioidaan 2 op
  kurssia kohden ja merkitään *op arvio*.
- **Vuositasojako** perustuu Tapiolan lukion valintakorttiin 2026–2027.
- **Kurssikoodien muoto.** Oletus: kaksinumeroiset koodit (esim. `ÄI05`) ja
  yksinumeroiset B-kielillä.
- **Ei 2FA:ta.**
- **Ei kurssien poistoa valinnasta.**
- **PDF vain latinalaisilla kirjaimilla.**

---

## Vianetsintä

Paina **Vianetsintätiedot** (Valinta-välilehden *Lisää*-osiossa tai
Vienti-välilehdellä) ja liitä raportti kehittäjälle.

| Oire | Todennäköinen syy | Mitä tehdä |
|---|---|---|
| Etsi löytää 0 kurssia | Kurssikoodi ei vastaa Wilman muotoa | Tarkista koodi ja kokeile `@periodi`-rajausta. |
| Valinta ei mene läpi | Jakso ei ole auki, ryhmä täynnä tai Wilma estää | Lue konsolin `srvError`-rivi. |
| Silmukka ei päivity | Välilehti taustalla tai vartija lataa | Pidä välilehti esillä tai käytä erillistä ikkunaa. |
| Dashboardin luvut eivät täsmää | Suoritukset- tai HOPS-sivu eri rakenteinen | Lähetä vianetsintätiedot. |
| Kirjautuminen ei onnistu automaattisesti | 2FA tai lomakekenttien nimet poikkeavat | Kirjaudu käsin ja lähetä vianetsintätiedot. |

---

## Versiohistoria

| Versio | Muutos |
|---|---|
| **1.0.0** | Ensimmäinen Release. Testattu oikeassa Wilmassa. Versionumero ponnahdusikkunassa ja dashboardilla. Pitkä README. |
| 0.32.1 | Vienti-välilehden napit ja selitteet näkyvät tummassa teemassa. |
| 0.32.0 | PDF uudistettu: Inter-fontti, värit, yhteenvetolaatikot. Uusi Vienti-välilehti. CSV-vienti ja leikepöytäkopio. |
| 0.31.0 | Kurssit jaettu tyypeittäin omiin valikkoihin. PDF-vienti. |
| 0.30.1 | Vuositasovalinta harmaannuttaa myöhemmän vuoden kurssit. Valinta myös dashboardilla. |
| 0.30.0 | Opintovuosi-valinta valintasivulle Tapiolan lukion valintakortin mukaan. |
| 0.29.1 | Valintasivu yksinkertaisempi, selitykset lyhyempiä. |
| 0.29.0 | Nopea pyyntöpolku: valinnat ensin, haku rinnalla, ei kaksoislähetyksiä, Web Locks -lukko. |
| 0.28.0 | Oppiaineen piilotus ja piilotettujen valikko. |
| 0.27.0 | Koko näkymä jaettu kuuteen välilehteen. |
| 0.26.0 | Siivous: dashboard päivittyy vain tilariviltä, CSS pieneni 36 kt → 28 kt. |
| 0.25.0 | Silmukan välilehdet erilliseen ikkunaan. |
| 0.24.0 | Istunnon ylläpito 4 minuutin välein. |
| 0.23.0 | Tunnukset ja automaattinen kirjautuminen. Väli millisekunteina. |
| 0.22.0 | Hybridissä vain lisävälilehdet päivittyvät. Tapahtumat konsoliin. |
| 0.21.0 | Lo-fi-ilme. |
| 0.20.0 | Hybridi-tila: kaksi välilehteä, kolme virtuaalivalitsijaa. |
| 0.19.0 | 5 ms kehittäjänopeus. Pysäytys sulkee lisävälilehdet. |
| 0.17.0 | Valinnat tallentuvat luettavaan .txt-tiedostoon. |
| 0.16.0 | Modernimpi ulkoasu. |
| 0.15.0 | Silmukan tilarivi, vanhentuneen kirjautumisen tunnistus. |
| 0.14.0 | Konsoli dashboardille. Dashboardin optimointi. |
| 0.13.0 | Asetukset synkronoituvat välilehtien välillä. |
| 0.12.0 | Paneelin koko muutettavissa. |
| 0.11.0 | Kehittäjäasetukset, kevyt tila, prosenttipalkki, värien selitykset. |
| 0.10.0 | Silmukka jatkaa, kunnes pysäytetään. |
| 0.9.0 | HOPS- ja Suoritukset-sivujen luku. |
| 0.8.0 | Opintopisteet, HOPS-vertailu, teemakytkin, ruotsi, värikoodaus. |
| 0.7.0 | Dashboard: valikot, oikea klikkaus, uusien kurssien valintamoodi. |
| 0.6.0 | Dashboard ja LOPS-pakollisuudet. |
| 0.5.0 | Wilman pikavalinnan ruksaus, ?-selitykset, erottuvat napit, erillinen välilehti. |
| 0.4.0 | Pikavalinta automaattisesti päälle. |
| 0.3.0 | Refresh-aika, kurssikohtaiset jaksorajaukset, uusi ulkoasu. |
| 0.2.0 | Usean koulun jaksot yhtä aikaa, tallennus tiedostoon, laajennus. |
| 0.1.0 | Ensimmäinen versio: paneeli, dark mode, taulukot, päivämäärät, keskiarvo, CSV. |

---

## Tekijät

**BenXmas**
Idea, vaatimukset, käyttöliittymän suunta, testaus oikeassa Wilmassa.

**Claude (Anthropic)**
Suunnittelu, koodi, testit ja dokumentaatio.

---

## Kiitokset

- [drstuggels/kurssit](https://github.com/drstuggels/kurssit) — kurssivalinnan
  tekninen esikuva.
- [Wilma Enhancer](https://addons.mozilla.org/fi/firefox/addon/wilma-enhancer/)
  — inspiraatio automaattiseen valintaan.
- Wilman kehittäjät ja koulujen ylläpitäjät.

---

*Tämä työkalu ei ole Wilman tai sen kehittäjien virallinen tuote. Käyttö on
omalla vastuulla.*

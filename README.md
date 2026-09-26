# Website Casteleijn College

Nieuwe website voor het Casteleijn College (vso, Emmeloord), gebouwd met [Jekyll](https://jekyllrb.com/). GitHub Pages bouwt en publiceert de site automatisch.

- **Bron van de inhoud:** de oude site op eduvier.nl/casteleijncollege (september 2026)

## Structuur

| Pagina | Bestand | Inhoud |
|---|---|---|
| Home | `index.html` | Belofte, wegwijzer per doelgroep, Rust/Ruimte/Richting, de school in het kort, leerwegen, film, agenda met laatste nieuws, vragen, afsluiter met de drie stappen naar aanmelden |
| De school | `school.html` | Wie we zijn, voor wie, aanpak, samenwerking, medezeggenschap |
| Leerwegen | `leerwegen.html` + `_leerwegen/*.md` | Overzicht, vergelijking en een eigen pagina per leerweg |
| Stage & toekomst | `toekomst.html` | Meer dan leren, stageroute, schoolcertificaten, ESF |
| Verhalen | `verhalen.html` + `_posts/` | Film, fotogalerij, nieuws, werken bij |
| Voor ouders | `ouders.html` | Mentor, schooltijden, vakanties, agenda, documenten |
| Aanmelden | `aanmelden.html` | 3 stappen, TLV, rondleiding aanvragen, informatieavond |
| Contact | `contact.html` | Telefoon, mail, adres, kaart |
| Veelgestelde vragen | `vragen.html` | Uit `_data/vragen.yml` |

## Zelf aanpassen (zonder programmeren)

Alles kan direct in GitHub via het potloodje bij een bestand.

- **Verhaal/nieuwsbericht toevoegen:** maak in `_posts/` een bestand `JJJJ-MM-DD-titel.md`. Kopieer een bestaand bericht als voorbeeld. Het nieuwste bericht komt vanzelf op de homepage.
- **Agenda:** `_data/agenda.yml`. Voorbije activiteiten verdwijnen automatisch.
- **Veelgestelde vragen:** `_data/vragen.yml` (`home: true` = ook op de homepage).
- **Foto's:** zet de foto in `assets/img/` en voeg hem toe in `_data/fotos.yml` (met alt-tekst). Alleen foto's met toestemming.
- **Leerwegen:** één bestand per leerweg in `_leerwegen/`.
- **Contactgegevens, schoolgids-link, video's, formulierdienst:** `_data/school.yml`.
- **Informatieavond:** het agenda-item met titel `Informatieavond` in `_data/agenda.yml` (datum, `begin`, `einde`, `inloop`). De pagina Aanmelden neemt dit vanzelf over en verbergt het blok als de avond voorbij is.
- **Menu:** `_data/navigatie.yml`.
- **Vakanties en vrije dagen:** tabel in `ouders.html` en `_data/agenda.yml`.

Schrijf zoals de rest van de site: "je", korte zinnen, concreet.

## Lokaal bekijken

```bash
gem install jekyll
jekyll serve
# open http://localhost:4000/
```

De site staat op **https://casteleijn.meneergreidanus.nl** (bestand `CNAME`, plus `url` in `_config.yml`). Naar een ander domein, bijvoorbeeld `www.casteleijncollege.nl`? Pas dan `CNAME` en `url` aan, zet het domein in GitHub bij Settings → Pages, en maak bij de domeinprovider een CNAME-record naar `lorenzogreidanus.github.io`.

## Let op

- **Formulier "Rondleiding aanvragen":** zolang `formulier_endpoint` in `_data/school.yml` leeg is, opent het formulier een ingevulde e-mail (met een knop om de gegevens te kopiëren als er geen mailprogramma opent). Vul je daar de link van een formulierdienst in, bijvoorbeeld `https://formspree.io/f/abcd1234`, dan wordt de aanvraag direct op de pagina verstuurd, met bevestiging en foutmelding.
- De pdf's (schoolgids, verlofaanvraag, Aandacht+) staan nog op eduvier.nl en worden daarheen gelinkt.
- De YouTube-film laadt pas na een klik (privacyvriendelijk, geen cookies vooraf).

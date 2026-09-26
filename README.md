# Website Casteleijn College

Nieuwe website voor het Casteleijn College (vso, Emmeloord), gebouwd met [Jekyll](https://jekyllrb.com/). GitHub Pages bouwt en publiceert de site automatisch.

- **Merkboek & tone of voice:** `/merkboek/` (bestand `merkboek.html`)
- **Bron van de inhoud:** de oude site op eduvier.nl/casteleijncollege (september 2026)

## Structuur

| Pagina | Bestand | Inhoud |
|---|---|---|
| Home | `index.html` | Belofte, wegwijzer per doelgroep, Rust/Ruimte/Richting, cijfers, leerwegen, stage-route, film, aanmelden, agenda, vragen, verhalen |
| De school | `school.html` | Wie we zijn, voor wie, aanpak, samenwerking, medezeggenschap |
| Leerwegen | `leerwegen.html` + `_leerwegen/*.md` | Overzicht, vergelijking en een eigen pagina per leerweg |
| Stage & toekomst | `toekomst.html` | Meer dan leren, stageroute, schoolcertificaten, ESF |
| Verhalen | `verhalen.html` + `_posts/` | Film, fotogalerij, nieuws, werken bij |
| Voor ouders | `ouders.html` | Mentor, schooltijden, vakanties, agenda, documenten |
| Aanmelden | `aanmelden.html` | 3 stappen, TLV, rondleiding aanvragen, informatieavond |
| Contact | `contact.html` | Telefoon, mail, adres, kaart |
| Veelgestelde vragen | `vragen.html` | Uit `_data/vragen.yml` |
| Merkboek | `merkboek.html` | Analyse, merkkern, tone of voice, schrijfwijzer, huisstijl |

## Zelf aanpassen (zonder programmeren)

Alles kan direct in GitHub via het potloodje bij een bestand.

- **Verhaal/nieuwsbericht toevoegen:** maak in `_posts/` een bestand `JJJJ-MM-DD-titel.md`. Kopieer een bestaand bericht als voorbeeld. Het nieuwste bericht komt vanzelf op de homepage.
- **Agenda:** `_data/agenda.yml`. Voorbije activiteiten verdwijnen automatisch.
- **Veelgestelde vragen:** `_data/vragen.yml` (`home: true` = ook op de homepage).
- **Foto's:** zet de foto in `assets/img/` en voeg hem toe in `_data/fotos.yml` (met alt-tekst). Alleen foto's met toestemming.
- **Leerwegen:** één bestand per leerweg in `_leerwegen/`.
- **Contactgegevens, schoolgids-link, video's:** `_data/school.yml`.
- **Menu:** `_data/navigatie.yml`.
- **Vakanties en vrije dagen:** tabel in `ouders.html` en `_data/agenda.yml`.

Schrijf altijd volgens het merkboek: "je", korte zinnen, concreet.

## Lokaal bekijken

```bash
gem install jekyll
jekyll serve
# open http://localhost:4000/casteleijnwebsite.github.io/
```

Komt de site op een eigen domein (bijv. `www.casteleijncollege.nl`)? Zet dan `baseurl: ""` en de juiste `url` in `_config.yml` en voeg een `CNAME`-bestand toe.

## Let op

- Het oriëntatieformulier opent een ingevulde e-mail (de site heeft geen server). Voor een echt verzendformulier kan een dienst als Formspree of het formulierensysteem van Eduvier worden gekoppeld.
- De pdf's (schoolgids, verlofaanvraag, Aandacht+) staan nog op eduvier.nl en worden daarheen gelinkt.
- De YouTube-film laadt pas na een klik (privacyvriendelijk, geen cookies vooraf).

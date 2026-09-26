# Website Casteleijn College

Nieuwe website voor het Casteleijn College (vso, Emmeloord), gebouwd met [Jekyll](https://jekyllrb.com/). GitHub Pages bouwt en publiceert de site automatisch.

- **Merkboek & tone of voice:** `/merkboek/` (bestand `merkboek.html`)
- **Bron van de inhoud:** de oude site op eduvier.nl/casteleijncollege (september 2026)

## Structuur

| Pagina | Bestand | Inhoud |
|---|---|---|
| Home | `index.html` | Belofte, leerwegen, film, aanmelden, agenda, nieuws |
| Onze school | `onze-school.html` | Wie we zijn, voor wie, aanpak, samenwerking, MR |
| Onderwijs | `onderwijs.html` | Vergelijking + vmbo-bb/kb/tl, havo, meer dan leren, stage |
| In beeld | `in-beeld.html` | Film, fotogalerij, nieuws, werken bij |
| Aanmelden | `aanmelden.html` | 3 stappen, TLV, oriëntatiebezoek, informatieavond |
| Praktisch | `praktisch.html` | Schooltijden, vakanties, vrije dagen, documenten, ESF |
| Contact | `contact.html` | Adres, kaart, contact |

## Zelf aanpassen (zonder programmeren)

Alles kan direct in GitHub via het potloodje ✏️ bij een bestand.

- **Nieuwsbericht toevoegen:** maak in de map `_posts/` een bestand `JJJJ-MM-DD-titel.md`. Kopieer een bestaand bericht als voorbeeld. Het bericht komt vanzelf op de homepage en op *In beeld*.
- **Agenda:** pas `_data/agenda.yml` aan. Voorbije activiteiten verdwijnen automatisch.
- **Foto's:** zet de foto in `assets/img/` en voeg hem toe in `_data/fotos.yml` (met alt-tekst!). Alleen foto's met toestemming.
- **Contactgegevens, schoolgids-link, video's:** `_data/school.yml`.
- **Leerwegen:** `_data/leerwegen.yml`.
- **Menu:** `_data/navigatie.yml`.
- **Vakanties en vrije dagen:** in `praktisch.html` (tabel) en in `_data/agenda.yml`.

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

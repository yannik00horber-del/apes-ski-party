# Après-Ski Party Gossau – Website

Statische Website (HTML/CSS/JS, kein Server, keine Datenbank nötig) für die
Après-Ski Party Gossau am 17. April 2027.

## Dateien

```
index.html          Startseite (Event, DJ, Location, Tickets, Infos)
impressum.html       Impressum
datenschutz.html      Datenschutzerklärung
css/style.css        Gesamtes Styling
js/main.js            Mobile-Menü, Cookie-Consent, verzögertes Laden von Google Maps
404.html              Fehlerseite für nicht gefundene Adressen
share-image.png       Vorschaubild fürs Teilen (WhatsApp, Instagram, Facebook) – aus dem Flyer erstellt
flyer/                Offizieller Event-Flyer: volle Auflösung (Grossansicht/Download)
                      und eine verkleinerte Version (-800) für die Anzeige auf der Seite
.htaccess             verweist Fehler 404 auf 404.html (nur Apache-Hosting)
robots.txt            Anweisungen für Suchmaschinen
sitemap.xml            Sitemap für Suchmaschinen
favicon.svg            Browser-Icon (vereinfachte Skibrille aus dem Party-Emblem)
party-emblem.svg      Party-Emblem, helle Version für dunkle Hintergründe
party-emblem-dark.svg  Party-Emblem, dunkle Version für helle Hintergründe
sponsoren/            Logos der Sponsoren (aktuell: Horber Innenausbau)
skiclub-gossau-logo.jpeg  Original-Logo (unverändert, wird im Footer verwendet)
skiclub-gossau-logo-trim.png  Original-Logo ohne weissen Rand, für die Navigation
skiclub-gossau-logo-transparent.png  Invers-Version (weisse Schrift, transparent) für den dunklen Hero-Bereich
dj-logo.jpeg          Foto DJ Beatstyle
dj-beatstyle-logo.svg  Logo DJ Beatstyle (weiss, transparent) – im Hero und im DJ-Bereich
```

Startseiten-Reihenfolge: Hero (nachempfunden dem Flyer) → Sponsoren → Event
(Infos, Location, Flyer) → DJ → Tickets → FAQ → Club/Mitglieder-Werbung.

## Design (abgestimmt auf den Flyer)

Farben und Schriften sind aus dem offiziellen Flyer übernommen und zentral als
Variablen ganz oben in `css/style.css` (`:root`) hinterlegt:

| Variable        | Farbe     | Einsatz                                  |
|-----------------|-----------|------------------------------------------|
| `--night`       | `#070927` | Seitenhintergrund (Nachthimmel)          |
| `--night-2`     | `#0e1442` | Karten, Info-Boxen                       |
| `--pink`        | `#ff2e93` | Neon-Akzente, Glow                       |
| `--magenta`     | `#e0177f` | Buttons, Pinselstrich, Ticket-Bereich    |
| `--pink-soft`   | `#ffaadd` | «PARTY»-Schriftzug, Pinsel-Akzente       |
| `--cyan`        | `#64e9ee` | Info-Texte, Labels (wie auf dem Flyer)   |

Schriften: «Poppins» (fette Titel wie «APRÈS SKI»), «Permanent Marker»
(Pinsel-Schrift wie «PARTY»), «Saira Condensed» (schmale Info-Zeilen, Menü,
Buttons) und «Inter» (Fliesstext).

Der Hero-Bereich (Sonne mit Streifen, Laser-Linien, Bergkette, Tannen,
Lichterkette) ist komplett mit CSS und einem eingebetteten SVG gezeichnet –
er skaliert deshalb ohne Qualitätsverlust auf jede Bildschirmgrösse.

## Flyer austauschen

Kommt eine neue Version des Flyers, einfach die beiden Dateien in `flyer/`
mit gleichem Namen ersetzen:

- `apres-ski-party-2027-flyer.jpg` – volle Auflösung (Grossansicht und Download)
- `apres-ski-party-2027-flyer-800.jpg` – gleiche Datei, auf 800 px Breite verkleinert

Hat der neue Flyer ein anderes Seitenverhältnis als 1131 × 1600, in
`index.html` beim Flyer-Bild die Angaben `width`/`height` sowie in
`css/style.css` bei `.flyer-open img` das `aspect-ratio` anpassen.

Alles ist rein statisch – die Dateien können 1:1 per FTP/SFTP oder über die
Datei-Upload-Funktion eines beliebigen Webhosting-Anbieters (z. B. Hostpoint,
Infomaniak, Cyon, Metanet …) in das Hauptverzeichnis der Domain hochgeladen
werden. `index.html` muss dabei im Wurzelverzeichnis liegen, damit sie
automatisch als Startseite ausgeliefert wird.

## Vor der Veröffentlichung noch anpassen

Folgende Platzhalter unbedingt vor dem Live-Schalten ersetzen:

1. **Domain** – ✅ erledigt: `https://apresskipartygossau.ch/` ist in
   `index.html`, `impressum.html`, `datenschutz.html`, `robots.txt` und
   `sitemap.xml` eingetragen.
2. **Eventfrog-Link** – ✅ erledigt. Der Ticket-Button und die strukturierten
   Event-Daten verlinken direkt auf die Eventfrog-Seite (derselbe Link, auf
   den auch der QR-Code des Flyers weiterleitet). Ändert sich der Link, in
   `index.html` nach `eventfrog.ch` suchen (2 Stellen).
3. **Hosting-Anbieter** – ✅ erledigt: GitHub Pages (GitHub, Inc., USA) ist in
   `datenschutz.html`, Abschnitt 3, eingetragen. Bei einem Wechsel des Hosters
   diesen Abschnitt anpassen.
4. Adresse, Kontakt-E-Mails und Vereinsdaten in `impressum.html` und
   `datenschutz.html` auf Richtigkeit prüfen.
5. **Sponsoren** – Sponsor 1 (Horber Innenausbau) ist bereits eingesetzt; das
   Logo liegt als `sponsoren/horber-innenausbau.png` und wurde aus
   `Logo_Horber.pdf` freigestellt (Bildmarke + Schriftzug, ohne die
   Adress- und Telefonzeilen des Inserats). Eine Website ist dort nicht
   bekannt, deshalb ist diese Karte noch nicht verlinkt – sobald eine URL
   vorliegt, das `<div class="sponsor-card">` gemäss Kommentar im Code durch
   ein `<a …>` ersetzen. Weitere Sponsoren hinzufügen:
   - Logo-Datei in den Ordner `sponsoren/` legen (idealerweise PNG mit
     transparentem Hintergrund, querformatig).
   - In `index.html` im Block `sponsor-grid` eine weitere Karte nach dem
     Muster im Kommentar einfügen (mit Website als `<a class="sponsor-card" …>`,
     ohne Website als `<div class="sponsor-card">`).
   - Das Layout passt sich automatisch an: auf dem Computer stehen die
     Karten nebeneinander (bei Platzmangel in mehreren Reihen), auf dem Handy
     untereinander.

6. **Strukturierte Event-Daten** – in `index.html` steht im Kopfbereich ein
   `application/ld+json`-Block mit Datum, Ort, Preis und Veranstalter (damit
   Google die Party als Event erkennen kann). Wenn sich Datum, Preis oder Ort
   ändern, diesen Block **zusätzlich** zum sichtbaren Text anpassen.
7. **Vorschaubild beim Teilen** – ✅ `share-image.png` (1200 × 630) zeigt jetzt
   den Flyer mit Datum, Ort und Ticketinfo. Wird der Flyer geändert, das Bild
   in gleicher Grösse und mit gleichem Dateinamen ersetzen (unter 300 KB
   halten, sonst zeigt WhatsApp keine Vorschau).

## Veröffentlichung (GitHub Pages)

Die Website wird über GitHub Pages direkt aus diesem Repository veröffentlicht
(Branch `main`, Ordner `/`). Die leere Datei `.nojekyll` sorgt dafür, dass
GitHub die Dateien unverändert ausliefert.

- **Pages einschalten:** Repository → Settings → Pages → Source «Deploy from a
  branch», Branch `main`, Ordner `/ (root)`.
- **Domain:** unter Custom domain `apresskipartygossau.ch` eintragen. GitHub
  legt dabei selbst eine Datei `CNAME` im Repository an – danach einmal
  `git pull`, sonst schlägt der nächste Push fehl.
- **DNS beim Domain-Anbieter:**
  - `A`-Records für `@`: `185.199.108.153`, `185.199.109.153`,
    `185.199.110.153`, `185.199.111.153`
  - optional `AAAA` für `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
    `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - `CNAME` für `www`: `yannik00horber-del.github.io`
- **HTTPS:** sobald die Domain erkannt ist, «Enforce HTTPS» anhaken (kann bis
  zu 24 Stunden dauern).
- **Updates:** Änderungen committen und pushen – nach ca. 1 Minute sind sie live.
- **Browser-Cache:** CSS und JavaScript sind mit einer Versionsnummer
  eingebunden (`css/style.css?v=20261020`). Nach Änderungen an `style.css` oder
  `main.js` diese Nummer in allen vier HTML-Dateien erhöhen (z. B. auf das
  aktuelle Datum), sonst sehen Besucher:innen bis zu 10 Minuten lang die alte
  Version.

Die `.htaccess` wird von GitHub Pages ignoriert; die `404.html` wird dort
automatisch als Fehlerseite verwendet.

## Cookie-Consent & Google Maps

Die Seite selbst setzt keine Tracking-Cookies. Damit auf der Startseite eine
Anfahrtskarte angezeigt werden kann, ist Google Maps eingebunden – die Karte
wird aber erst geladen, nachdem Besucher:innen im Cookie-Banner zustimmen
(„Alle akzeptieren“ oder gezielt „Externe Inhalte“ in den Einstellungen). Die
getroffene Auswahl wird nur lokal im Browser (`localStorage`) gespeichert,
nicht auf einem Server. Über den Link „Cookie-Einstellungen“ im Footer kann
die Auswahl jederzeit geändert werden.

## Fehlerseite (404)

`404.html` arbeitet bewusst mit absoluten Pfaden (`/css/style.css`), damit sie
auch bei tief verschachtelten Adressen korrekt aussieht. Das heisst umgekehrt:
Per Doppelklick geöffnet wirkt sie unformatiert – auf dem Server stimmt die
Darstellung. Die mitgelieferte `.htaccess` verknüpft Fehler 404 mit dieser
Seite; das funktioniert bei Apache-Hosting (u. a. Hostpoint, Cyon). Bei
anderen Anbietern wird die Fehlerseite im Kundenpanel eingestellt, dann kann
die `.htaccess` gelöscht werden.

## Schriften (Google Fonts)

Die Website lädt die Schriften «Poppins», «Permanent Marker», «Saira Condensed» und «Inter» von Google Fonts. Dabei wird
die IP-Adresse der Besucher:innen an Google übermittelt – das ist in der
Datenschutzerklärung unter Ziffer 6 offengelegt. Wer das vermeiden möchte, kann
die Schriften herunterladen (z. B. über den «google-webfonts-helper»),
die Dateien in einen Ordner `fonts/` legen und in `css/style.css` per
`@font-face` einbinden; danach die `fonts.googleapis.com`-Zeilen aus dem
Kopfbereich der vier HTML-Dateien entfernen. Die Seite lädt dann etwas schneller
und funktioniert auch komplett offline.

## Party-Emblem

Das runde Emblem (Skibrille mit Bergpanorama, gekreuzte Ski, Ringschrift
«Après-Ski Party / Skiclub Gossau / 17.04.2027») ist als SVG neu gezeichnet
worden und gehört dem Skiclub Gossau – es wurden keine fremden Vorlagen,
Stock-Grafiken oder Bildausschnitte übernommen. Es lässt sich deshalb ohne
Lizenzkosten auch für Flyer, Plakate, Social Media oder Kleber verwenden.

Als SVG ist es beliebig skalierbar. Für Programme, die kein SVG können, lässt
sich aus der Datei in jedem Grafikprogramm (oder direkt im Browser über
«Drucken → Als PDF sichern») ein PNG in Wunschgrösse exportieren. Die
Ringschrift nutzt die Schrift «Anton»; wer das Emblem ausserhalb der Website
weiterverarbeitet, sollte diese Schrift installiert haben oder die Schrift im
Grafikprogramm in Pfade umwandeln.

## Rechtlicher Hinweis

Impressum und Datenschutzerklärung wurden nach bestem Wissen für einen
gemeinnützigen Schweizer Verein (Art. 60 ff. ZGB) und unter Berücksichtigung
des Schweizer Datenschutzgesetzes (DSG) erstellt. Das ersetzt keine
Rechtsberatung – bei Unsicherheiten empfiehlt sich eine kurze Prüfung durch
eine Fachperson, insbesondere sobald weitere Dienste (z. B. Newsletter,
Social-Media-Plugins, Analytics) hinzukommen.

## Browser-Support

Reines, abhängigkeitsfreies HTML/CSS/JS (kein Framework, kein Build-Schritt).
Funktioniert in allen aktuellen Browsern (Chrome, Safari, Firefox, Edge) und
ist für Mobilgeräte optimiert (Hamburger-Menü unter 750px Breite).

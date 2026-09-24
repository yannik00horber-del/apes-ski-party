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
share-image.png       Vorschaubild fürs Teilen (WhatsApp, Instagram, Facebook)
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
dj-logo.jpeg          Logo/Bild DJ Beatstyle
```

Startseiten-Reihenfolge: Sponsoren (ganz oben, direkt nach dem Hero-Bereich) →
Event → DJ → Location → Tickets → FAQ → Club/Mitglieder-Werbung → Infos.

Alles ist rein statisch – die Dateien können 1:1 per FTP/SFTP oder über die
Datei-Upload-Funktion eines beliebigen Webhosting-Anbieters (z. B. Hostpoint,
Infomaniak, Cyon, Metanet …) in das Hauptverzeichnis der Domain hochgeladen
werden. `index.html` muss dabei im Wurzelverzeichnis liegen, damit sie
automatisch als Startseite ausgeliefert wird.

## Vor der Veröffentlichung noch anpassen

Folgende Platzhalter unbedingt vor dem Live-Schalten ersetzen:

1. **Domain** – aktuell ist überall `https://www.apres-ski-party-gossau.ch/`
   als Platzhalter eingetragen (in `index.html`, `impressum.html`,
   `datenschutz.html`, `robots.txt`, `sitemap.xml`). Durch die echte, beim
   Hoster registrierte Domain ersetzen.
2. **Eventfrog-Link** – in `index.html` beim Kommentar
   `<!-- EVENTFROG_LINK_HIER_EINSETZEN -->` den `href="#"` des Ticket-Buttons
   durch den echten Eventfrog-Link ersetzen und die `onclick`-Zeile mit dem
   Alert-Hinweis entfernen.
3. **Hosting-Anbieter** – in `datenschutz.html`, Abschnitt 3 „Hosting &
   Server-Logfiles“, den Platzhalter `[Name und Sitz des Hosting-Anbieters
   einsetzen, sobald bekannt]` durch den tatsächlichen Anbieter ersetzen.
4. Adresse, Kontakt-E-Mails und Vereinsdaten in `impressum.html` und
   `datenschutz.html` auf Richtigkeit prüfen.
5. **Sponsoren** – Sponsor 1 (Horber Innenausbau) ist bereits eingesetzt; das
   Logo liegt als `sponsoren/horber-innenausbau.png` und wurde aus
   `Logo_Horber.pdf` freigestellt (Bildmarke + Schriftzug, ohne die
   Adress- und Telefonzeilen des Inserats). Eine Website ist dort nicht
   bekannt, deshalb ist diese Karte noch nicht verlinkt – sobald eine URL
   vorliegt, das `<div class="sponsor-card">` gemäss Kommentar im Code durch
   ein `<a …>` ersetzen. Für die übrigen Karten:
   - Logo-Datei in einen neuen Ordner `sponsoren/` legen (idealerweise PNG
     mit transparentem Hintergrund, quadratisch/querformatig).
   - Im `<a class="sponsor-card" ...>`-Tag den `href="#"` durch die echte
     Website-URL des Sponsors ersetzen (inkl. `https://`).
   - Innerhalb des `<a>`-Tags `<span class="sponsor-logo">SPONSOR 1</span>`
     durch `<img src="sponsoren/logo1.png" alt="Name des Sponsors">` ersetzen.
   - Werden weniger als 10 Sponsoren gebraucht, überzählige `<a class="sponsor-card">…</a>`-Blöcke
     einfach löschen; das Raster passt sich automatisch an.

6. **Strukturierte Event-Daten** – in `index.html` steht im Kopfbereich ein
   `application/ld+json`-Block mit Datum, Ort, Preis und Veranstalter (damit
   Google die Party als Event erkennen kann). Wenn sich Datum, Preis oder Ort
   ändern, diesen Block **zusätzlich** zum sichtbaren Text anpassen.
7. **Vorschaubild beim Teilen** – `share-image.png` (1200 × 630) ist
   hinterlegt und zeigt Logo, Titel, Datum und Ort. Sobald der Event-Flyer
   fertig ist, kann es durch ein Flyer-Motiv ersetzt werden – gleiche Grösse
   und gleicher Dateiname, dann muss sonst nichts angepasst werden.

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

Die Website lädt die Schriften «Anton» und «Inter» von Google Fonts. Dabei wird
die IP-Adresse der Besucher:innen an Google übermittelt – das ist in der
Datenschutzerklärung unter Ziffer 6 offengelegt. Wer das vermeiden möchte, kann
die beiden Schriften herunterladen (z. B. über den «google-webfonts-helper»),
die Dateien in einen Ordner `fonts/` legen und in `css/style.css` per
`@font-face` einbinden; danach die beiden `fonts.googleapis.com`-Zeilen aus dem
Kopfbereich der drei HTML-Dateien entfernen. Die Seite lädt dann etwas schneller
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

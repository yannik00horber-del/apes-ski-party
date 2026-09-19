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
robots.txt            Anweisungen für Suchmaschinen
sitemap.xml            Sitemap für Suchmaschinen
favicon.svg            Browser-Icon
skiclub-gossau-logo.jpeg  Logo Skiclub Gossau
dj-logo.jpeg          Logo/Bild DJ Beatstyle
```

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

## Cookie-Consent & Google Maps

Die Seite selbst setzt keine Tracking-Cookies. Damit auf der Startseite eine
Anfahrtskarte angezeigt werden kann, ist Google Maps eingebunden – die Karte
wird aber erst geladen, nachdem Besucher:innen im Cookie-Banner zustimmen
(„Alle akzeptieren“ oder gezielt „Externe Inhalte“ in den Einstellungen). Die
getroffene Auswahl wird nur lokal im Browser (`localStorage`) gespeichert,
nicht auf einem Server. Über den Link „Cookie-Einstellungen“ im Footer kann
die Auswahl jederzeit geändert werden.

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

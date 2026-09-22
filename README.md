# AS Immobilienverwaltung & Dienstleistungen

Die Datenschutz-Überarbeitung ist in `DATENSCHUTZ-PRUEFBERICHT.md` dokumentiert, einschließlich offener Betreiberangaben und Testgrenzen.

## Lokal starten und prüfen

```sh
npm ci
npm start
npm run build
CI=true npm test -- --watchAll=false --runInBand
```

## Veröffentlichung und Kontaktformular

Der React-Build befindet sich nach `npm run build` in `build/`. Für das Kontaktformular ist ein Webserver mit PHP, mbstring und OpenSSL nötig; rein statisches Hosting (z. B. GitHub Pages) führt `api/contact.php` nicht aus. Den Inhalt des Build-Ordners auf dem PHP-fähigen Server veröffentlichen.

Im Ergebnis sind keine echten SMTP-Zugangsdaten enthalten. Das im ursprünglichen Archiv enthaltene Passwort vor weiterer Nutzung wechseln. `.env.example` als Vorlage verwenden und die ausgefüllte `.env` ausschließlich **außerhalb des öffentlich erreichbaren Dokumentenverzeichnisses** speichern. Standardmäßig sucht PHP eine Verzeichnisebene oberhalb des Ordners, in dem `api/` liegt. Alternativ den absoluten Pfad über die serverseitige Umgebungsvariable `AS_CONTACT_ENV_FILE` setzen oder alle Werte direkt als Server-Umgebungsvariablen konfigurieren. Zugangsdaten niemals als `REACT_APP_*` definieren.

Beispiel: Bei `/srv/www/site/api/contact.php` liegt die Datei unter `/srv/www/.env`, wenn `/srv/www/site` das Document Root ist. Die tatsächlichen Pfade beim Hoster prüfen. Die PHP-Anwendung verweigert das Laden einer `.env` innerhalb des erkannten Document Root.

HTTPS auf dem Server erzwingen. SMTP unterstützt `tls` (STARTTLS, üblicherweise Port 587) oder `ssl` (implizites TLS, üblicherweise Port 465), keinen unverschlüsselten Modus. Nach Konfiguration eine eigene Anfrage an beide Fachbereiche testen.

Frontend und `api/contact.php` zusammen aktualisieren: Die frühere Pflichtbestätigung wurde auf beiden Seiten entfernt. Eine alte PHP-Datei würde neue Formularanfragen weiterhin ablehnen.

Die Einstellungen sind jederzeit im Footer erreichbar. Eine Änderung an den optionalen Zwecken oder am maßgeblichen Einwilligungstext erfordert eine neue `CONSENT_VERSION` in `src/utils/consent.js`. Bei einem neuen optionalen Dienst die zweckbezogene Auswahl erweitern; die Instagram-Zustimmung darf ihn nicht automatisch freigeben.

## Vertiefte Datenschutzprüfung

Die aktuelle Prüfung umfasst auch Bildmetadaten, Datenschutzerklärung, Impressum,
Formulartransport und Paketabhängigkeiten. Offene Betreiberangaben sind im Prüfbericht
aufgeführt. `docs/dependency-audit.json` enthält die verbleibenden Paketmeldungen;
insbesondere die ältere Build-Toolchain ist gesondert zu modernisieren.

Formularanfragen werden im Browser nur an denselben Ursprung gesendet, ohne Cookies,
ohne Referrer und ohne Weiterleitungen zu verfolgen. Öffentliche HTTP-Aufrufe dürfen
keine Formularanfrage senden; lokale Entwicklung auf localhost/127.0.0.1 ist ausgenommen.
Dies ersetzt keine serverseitige HTTPS-Erzwingung: Ein über HTTP geladenes Dokument
ist schon vor der JavaScript-Prüfung nicht gegen Veränderungen auf dem Transportweg geschützt.

Der PHP-Endpunkt erwartet `application/json` und akzeptiert Browseranfragen nur mit
passendem Origin. Bei einem Reverse Proxy muss der Webserver HTTPS korrekt erkennen;
ungeprüfte `X-Forwarded-*`-Header werden bewusst nicht als vertrauenswürdig verwendet.
Das Formular besitzt Honeypot und Mindest-Ausfüllzeit, jedoch keinen belastbaren
Rate-Limiter. Einen solchen bei Bedarf serverseitig mit kurzen Speicherfristen einrichten.

Bericht, README und `docs/` sind interne Projektunterlagen. Sie liegen außerhalb von
`public/`, werden nicht in `build/` kopiert und sind nicht auf der Website verlinkt.
Auf den Webserver gehören nur die Build-Dateien; Konfiguration mit Zugangsdaten bleibt
außerhalb des öffentlich erreichbaren Verzeichnisses.

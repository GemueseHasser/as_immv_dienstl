# AS Immobilienverwaltung & Dienstleistungen

## Start

```bash
cp .env.example .env
docker compose up --build
```

Die Website läuft danach unter `http://localhost`.

## Stack

- React-Frontend hinter **Nginx**
- **Spring Boot** Backend auf Java 21
- **Flyway** für die automatische Erstellung der MariaDB-Tabellen
- **MariaDB** für Benutzer, Wohnungsanzeigen, Bildgalerie und Nachrichten
- Kontaktanfragen per **SMTP** über das Backend statt PHP
- Anmeldung/Registrierung für Interessenten
- Admin-Bereich zum Erstellen, Bearbeiten und Löschen von Wohnungsanzeigen
- Bilder-Upload für Titelbild und Galerie
- Detailseite pro Wohnung mit Link zur Immobilienbörse

## Admin-Zugang

Beim ersten Start wird automatisch ein Admin-Benutzer aus `ADMIN_EMAIL` und `ADMIN_PASSWORD` angelegt.

## Hinweise

- Beispielwohnungen werden beim ersten leeren Datenbankstart automatisch erzeugt.
- Uploads werden im Docker-Volume `backend_uploads` gespeichert.
- Die alte PHP-Lösung wird nicht mehr verwendet.
- Flyway führt die Tabellenanlage beim Start des Spring-Boot-Backends aus.

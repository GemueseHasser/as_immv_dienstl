import React, { useEffect } from 'react';
import { openCookieSettings } from '../utils/consent';
import PageHero from '../components/PageHero';
import { company } from '../data/siteContent';

export default function DatenschutzPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
        <PageHero
            title="Datenschutzerklärung"
            text="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO"
        />

        <section className="section">
          <div className="container legal-card stack-gap narrow">

            <div>
              <h2>1. Verantwortlicher</h2>

              <p>
                <strong>AS Immobilienverwaltung & Dienstleistungen</strong>
                <br />
                Inhaber: {company.owner}
                <br />
                {company.addressLine1}
                <br />
                {company.addressLine2}
              </p>

              <p>
                Telefon: {company.phone}
                <br />
                E-Mail: {company.email}
              </p>
            </div>

            <div>
              <h2>2. Hosting</h2>

              <p>
                Diese Website wird bei STRATO AG gehostet.
                Anbieter ist die STRATO AG, Otto-Ostrowski-Straße 7,
                10249 Berlin.
              </p>

              <p>
                Beim Besuch dieser Website erfasst STRATO automatisch
                sogenannte Server-Logfiles. Dabei können insbesondere
                folgende Daten verarbeitet werden:
              </p>

              <ul>
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>aufgerufene Seiten</li>
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
              </ul>

              <p>
                Die Verarbeitung erfolgt zur technisch fehlerfreien
                Bereitstellung der Website sowie zur Gewährleistung
                der Sicherheit und Stabilität.
              </p>

              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div>
              <h2>3. Kontaktaufnahme</h2>

              <p>
                Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch kontaktieren,
                werden die von Ihnen übermittelten personenbezogenen
                Daten ausschließlich zur Bearbeitung Ihrer Anfrage
                verarbeitet.
              </p>

              <p>
                Dies betrifft insbesondere:
              </p>

              <ul>
                <li>Name</li>
                <li>Telefonnummer (im Formular freiwillig)</li>
                <li>E-Mail-Adresse</li>
                <li>Inhalt Ihrer Nachricht</li>
              </ul>

              <p>
                Die Verarbeitung erfolgt auf Grundlage von
                Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
                bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der Bearbeitung von Anfragen).
              </p>

              <p>
                Ihre Anfrage wird per verschlüsselter SMTP-Verbindung an das für den ausgewählten Bereich
                zuständige E-Mail-Postfach übermittelt. Unser Hosting- und E-Mail-Dienstleister
                verarbeitet die Daten zur Bereitstellung dieser Dienste. Die E-Mail-Adresse und
                die Nachricht sind für die Beantwortung erforderlich; die Telefonnummer ist optional.
                Ohne die erforderlichen Angaben kann das Formular nicht versendet werden.
                Es erfolgt keine Nutzung zu Werbezwecken.
              </p>

              <p>
                Ihre Daten werden gelöscht, sobald die Bearbeitung Ihrer
                Anfrage abgeschlossen ist und keine gesetzlichen
                Aufbewahrungspflichten bestehen.
              </p>
            </div>

            <div>
              <h2>4. Datenschutzauswahl und Instagram</h2>
              <h3>Speicherung Ihrer Auswahl</h3>
              <p>
                Wir speichern Ihre Entscheidung zu Instagram unter dem Schlüssel
                „as-site-cookie-consent“ im lokalen Speicher Ihres Browsers (Local Storage).
                Der Eintrag enthält die Auswahl, die Version des Einwilligungstextes sowie
                Entscheidungs- und Ablaufzeitpunkt, keine individuelle Nutzerkennung.
                Er wird nicht an unseren Server gesendet. Zustimmung und Ablehnung gelten
                jeweils 180 Tage; danach wird erneut gefragt. Abgelaufene Einträge werden
                nicht mehr als Entscheidung verwendet und bei der nächsten Auswahl ersetzt.
                Sie können den Eintrag auch über die Website-Daten Ihres Browsers löschen.
              </p>
              <p>
                Diese Speicherung dient ausschließlich dazu, Ihre Datenschutzauswahl zu beachten
                (§ 25 Abs. 2 Nr. 2 TDDDG; soweit personenbezogene Daten verarbeitet werden,
                Art. 6 Abs. 1 lit. f DSGVO). Bei blockiertem Browserspeicher gilt Ihre Auswahl
                nur für die aktuell geöffnete Seite bis zum Neuladen.
              </p>
              <h3>Freiwillige Instagram-Einbettung</h3>
              <p>
                Auf der Dienstleistungsseite können Sie Instagram-Inhalte aktivieren. Anbieter
                ist Meta Platforms Ireland Limited, Irland. Vor Ihrer Zustimmung wird keine
                Instagram-Einbettung geladen und durch diese Einbettung keine Verbindung zu Meta hergestellt.
                Mit Ihrer Zustimmung werden insbesondere Ihre IP-Adresse, Browser- und Geräteinformationen
                sowie Ihre Interaktion mit den Inhalten an Meta übermittelt. Meta kann Cookies
                und ähnliche Technologien für Analyse, Profilbildung und personalisierte Werbung
                einsetzen und die Daten einem bestehenden Instagram-Konto zuordnen.
              </p>
              <p>
                Grundlage für das optionale Speichern und Auslesen von Informationen auf Ihrem
                Endgerät ist § 25 Abs. 1 TDDDG, für die mit der Einbettung verbundene Verarbeitung
                personenbezogener Daten Art. 6 Abs. 1 lit. a DSGVO. Die übrige Website und das
                Kontaktformular bleiben auch ohne diese Einwilligung nutzbar.
              </p>
              <p>
                Meta kann Daten auch außerhalb der EU bzw. des EWR, insbesondere in den USA,
                verarbeiten. Informationen zu Empfängern, Speicherfristen, internationalen
                Übermittlungen und den von Meta beschriebenen Garantien finden Sie in der{' '}
                <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer">
                  Instagram-Datenschutzrichtlinie
                </a>. Die Dauer der von Meta gesetzten Speicherungen wird durch Meta bestimmt;
                unsere 180-Tage-Frist betrifft ausschließlich Ihre hier gespeicherte Auswahl.
              </p>
              <h3>Änderung und Widerruf</h3>
              <p>
                Über „Cookie-Einstellungen“ im Fußbereich jeder Seite können Sie Ihre Einwilligung
                jederzeit durch „Alle ablehnen“ mit Wirkung für die Zukunft widerrufen.
                Die geladene Einbettung wird dann entfernt. Die Rechtmäßigkeit der bisherigen
                Verarbeitung bleibt unberührt. Bereits an Meta übermittelte Daten und von Meta
                gesetzte Cookies werden dadurch nicht automatisch gelöscht. Website-Daten können
                Sie in Ihrem Browser löschen; Rechte bezüglich der bei Meta gespeicherten Daten
                können Sie gegenüber Meta geltend machen.
              </p>
              <button type="button" className="privacy-settings-link" onClick={openCookieSettings}>
                Cookie-Einstellungen öffnen
              </button>
              <p>
                Externe Instagram-Links stellen erst beim Anklicken eine Verbindung zum Ziel her.
                Für die anschließend besuchte Plattform gelten deren Datenschutzhinweise.
              </p>
            </div>

            <div>
              <h2>5. Ihre Rechte</h2>

              <p>
                Sie haben im Rahmen der gesetzlichen Vorschriften das Recht:
              </p>

              <ul>
                <li>gemäß Art. 15 DSGVO Auskunft über Ihre gespeicherten Daten zu erhalten,</li>
                <li>gemäß Art. 16 DSGVO die Berichtigung unrichtiger Daten zu verlangen,</li>
                <li>gemäß Art. 17 DSGVO die Löschung Ihrer Daten zu verlangen,</li>
                <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung zu verlangen,</li>
                <li>gemäß Art. 20 DSGVO Datenübertragbarkeit zu verlangen,</li>
                <li>gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung einzulegen,</li>
                <li>eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen.</li>
              </ul>
            </div>

            <div>
              <h2>6. Beschwerderecht bei der Aufsichtsbehörde</h2>

              <p>
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde
                über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
              </p>

              <p>
                Zuständige Aufsichtsbehörde in Nordrhein-Westfalen:
              </p>

              <p>
                Landesbeauftragte für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen
                <br />
                Kavalleriestraße 2–4
                <br />
                40213 Düsseldorf
                <br />
                Website:
                <a
                    href="https://www.ldi.nrw.de"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {' '}https://www.ldi.nrw.de
                </a>
              </p>
            </div>

            <div>
              <h2>7. Dauer der Speicherung</h2>

              <p>
                Personenbezogene Daten werden nur so lange gespeichert,
                wie dies zur Erfüllung der jeweiligen Zwecke erforderlich
                ist oder gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </div>

            <div>
              <h2>8. SSL- bzw. TLS-Verschlüsselung</h2>

              <p>
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz
                der Übertragung vertraulicher Inhalte eine SSL- bzw.
                TLS-Verschlüsselung.
              </p>
            </div>

            <div>
              <h2>9. Automatisierte Entscheidungsfindung</h2>

              <p>
                Wir treffen anhand Ihrer Kontaktanfrage keine automatisierten Entscheidungen
                gemäß Art. 22 DSGVO. Zur möglichen Profilbildung durch Meta nach Aktivierung
                der Instagram-Einbettung beachten Sie Abschnitt 4.
              </p>
            </div>

          </div>
        </section>
      </>
  );
}
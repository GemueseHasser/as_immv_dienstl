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
                Verantwortlich: {company.owner} (Inhaber)
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
                Diese Website wird bei STRATO GmbH gehostet.
                Anbieter ist die STRATO GmbH, Otto-Ostrowski-Straße 7,
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
                <li>Name, soweit Sie ihn freiwillig mitteilen</li>
                <li>Telefonnummer (im Formular freiwillig)</li>
                <li>E-Mail-Adresse</li>
                <li>Inhalt Ihrer Nachricht sowie ausgewählter Geschäftsbereich und gegebenenfalls Leistungsart</li>
              </ul>

              <p>
                Geht es um einen Vertrag mit Ihnen oder um von Ihnen angefragte vorvertragliche
                Maßnahmen, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Sonstige Anfragen
                bearbeiten wir auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes
                Interesse ist die sachgerechte Beantwortung Ihrer Nachricht. Eine Einwilligung
                in Instagram ist hierfür nicht erforderlich.
              </p>

              <p>
                Anfragen über das Kontaktformular werden per verschlüsselter SMTP-Verbindung an das für den ausgewählten Bereich
                zuständige E-Mail-Postfach übermittelt. Unser Hosting- und E-Mail-Dienstleister
                verarbeitet die Daten zur Bereitstellung dieser Dienste. Die E-Mail-Adresse und
                die Nachricht sind für die Beantwortung erforderlich; die Telefonnummer ist optional.
                Ohne die erforderlichen Angaben kann das Formular nicht versendet werden.
                Es erfolgt keine Nutzung zu Werbezwecken.
              </p>

              <p>
                Kontaktanfragen werden gelöscht, wenn das Anliegen abschließend geklärt ist und
                die Angaben nicht mehr zur Vertragsabwicklung oder zur Geltendmachung, Ausübung
                oder Verteidigung konkreter Rechtsansprüche benötigt werden. Soweit für einzelne
                Unterlagen handels- oder steuerrechtliche Aufbewahrungspflichten bestehen,
                bewahren wir diese auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO bis zum Ablauf
                der einschlägigen Frist auf. Diese Ausnahmen gelten nicht pauschal für jede Anfrage.
              </p>
            </div>

              <div>
                <h3>Schutz des Kontaktformulars vor automatisiertem Missbrauch</h3>
                <p>
                  Mit dem Absenden werden außerdem der Zeitpunkt des Öffnens des Formulars
                  und der Wert eines für normale Besucher unsichtbaren Prüffeldes übertragen.
                  Der Server prüft damit eine Mindest-Ausfüllzeit und erkennt automatisierte
                  Eingaben. Diese Prüfwerte werden von der Formularanwendung nicht dauerhaft
                  gespeichert und nicht in die Anfrage-E-Mail aufgenommen. Externe CAPTCHA-Dienste
                  werden nicht eingesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO;
                  unser Interesse ist der Schutz des Kontaktkanals vor Missbrauch.
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
                jeweils 180 Tage; danach wird erneut gefragt. Abgelaufene und ungültige Einträge
                werden beim nächsten Zugriff der Website gelöscht, soweit der Browser dies zulässt.
                Sie können den Eintrag auch über die Website-Daten Ihres Browsers löschen.
              </p>
              <p>
                Diese Speicherung dient ausschließlich dazu, Ihre Datenschutzauswahl zu beachten
                (§ 25 Abs. 2 Nr. 2 TDDDG; soweit personenbezogene Daten verarbeitet werden,
                Art. 6 Abs. 1 lit. f DSGVO). Bei blockiertem Browserspeicher gilt Ihre Auswahl
                nur für die aktuell geöffnete Seite bis zum Neuladen. Falls Ihr Browser das
                Ersetzen oder Löschen einer zuvor gespeicherten Auswahl verhindert, löschen Sie
                für einen dauerhaften Widerruf bitte die Website-Daten in den Browsereinstellungen.
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
                <li>gemäß Art. 21 DSGVO Widerspruch unter den nachfolgend erläuterten Voraussetzungen einzulegen,</li>
                <li>eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen.</li>
              </ul>
            </div>

            <aside className="privacy-rights-notice" aria-labelledby="privacy-objection-title">
              <h3 id="privacy-objection-title">Ihr Widerspruchsrecht</h3>
              <p>
                Soweit wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten,
                können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                jederzeit widersprechen. Wir verarbeiten die betroffenen Daten dann nicht weiter,
                es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre
                Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              </p>
              <p>
                Gegen eine Verarbeitung für Direktwerbung können Sie jederzeit ohne Angabe
                solcher Gründe widersprechen. Zur Ausübung Ihrer Rechte genügt eine formlose
                Mitteilung an die oben genannten Kontaktdaten, etwa an{' '}
                <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            </aside>

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
                Beim Aufruf über HTTPS wird die Verbindung zwischen Ihrem Browser und unserem
                Webserver mit TLS verschlüsselt. Die Formularanwendung versendet ihre E-Mail nur
                über eine verschlüsselte Verbindung zum konfigurierten Mailserver. Dies ist eine
                Transportverschlüsselung und keine Ende-zu-Ende-Verschlüsselung der E-Mail.
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
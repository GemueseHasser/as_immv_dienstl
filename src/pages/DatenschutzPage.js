import React, { useEffect } from 'react';
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
                Wenn Sie uns per E-Mail oder telefonisch kontaktieren,
                werden die von Ihnen übermittelten personenbezogenen
                Daten ausschließlich zur Bearbeitung Ihrer Anfrage
                verarbeitet.
              </p>

              <p>
                Dies betrifft insbesondere:
              </p>

              <ul>
                <li>Name</li>
                <li>Telefonnummer</li>
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
                Ihre Daten werden gelöscht, sobald die Bearbeitung Ihrer
                Anfrage abgeschlossen ist und keine gesetzlichen
                Aufbewahrungspflichten bestehen.
              </p>
            </div>

            <div>
              <h2>4. Cookies und externe Inhalte</h2>

              <p>
                Diese Website verwendet nur technisch notwendige Cookies,
                soweit dies für den Betrieb der Website erforderlich ist.
              </p>

              <p>
                Auf einzelnen Seiten können Inhalte von Instagram bzw.
                Meta Platforms eingebunden werden. Diese Inhalte werden
                erst geladen, nachdem Sie Ihre Einwilligung erteilt haben.
              </p>

              <p>
                Durch das Laden externer Inhalte können personenbezogene
                Daten, insbesondere Ihre IP-Adresse, an Meta Platforms
                übertragen werden. Außerdem können Cookies durch den
                Drittanbieter gesetzt werden.
              </p>

              <p>
                Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung).
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
                Eine automatisierte Entscheidungsfindung oder ein Profiling
                gemäß Art. 22 DSGVO findet nicht statt.
              </p>
            </div>

          </div>
        </section>
      </>
  );
}
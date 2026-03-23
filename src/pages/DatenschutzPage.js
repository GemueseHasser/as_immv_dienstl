import React, {useEffect} from 'react';
import PageHero from '../components/PageHero';
import { company } from '../data/siteContent';

export default function DatenschutzPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Hinweise zur Datenverarbeitung"
        text="Dieses Muster ist bewusst datensparsam formuliert und sollte vor Veröffentlichung mit den tatsächlich eingesetzten Tools, Formularen und Hosting-Diensten abgeglichen werden."
      />
      <section className="section">
        <div className="container legal-card stack-gap narrow">
          <div>
            <h2>1. Verantwortliche Stelle</h2>
            <p>
              {company.owner}
              <br />
              {company.addressLine1}
              <br />
              {company.addressLine2}
              <br />
              E-Mail: {company.email}
            </p>
          </div>
          <div>
            <h2>2. Zugriffsdaten</h2>
            <p>
              Beim Aufruf der Website können durch den Hosting-Anbieter technisch erforderliche
              Daten wie IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Inhalte und Angaben zum
              verwendeten Browser verarbeitet werden, um die Website bereitzustellen.
            </p>
          </div>
          <div>
            <h2>3. Kontaktaufnahme</h2>
            <p>
              Wenn Besucher per E-Mail oder Telefon Kontakt aufnehmen, werden die dabei
              übermittelten Angaben ausschließlich zur Bearbeitung der Anfrage verwendet.
            </p>
          </div>
          <div>
            <h2>4. Rechte der betroffenen Personen</h2>
            <p>
              Betroffene Personen haben im Rahmen der gesetzlichen Vorgaben das Recht auf
              Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Beschwerde bei
              einer zuständigen Aufsichtsbehörde.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

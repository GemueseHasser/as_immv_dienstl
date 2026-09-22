import React, { useEffect } from 'react';
import PageHero from '../components/PageHero';
import { company } from '../data/siteContent';

export default function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
        <PageHero
            title="Impressum"
            text="Rechtliche Angaben gemäß § 5 DDG"
        />

        <section className="section">
          <div className="container legal-card">

            <h2>Angaben gemäß § 5 DDG</h2>

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
              <strong>Kontakt</strong>
              <br />
              Telefon: {company.phone}
              <br />
              E-Mail: {company.email}
            </p>

            <p>
              <strong>Umsatzsteuer-ID</strong>
              <br />
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              DE195122677
            </p>

            <p>
              <strong>Aufsichtsbehörde</strong>
              <br />
              Industrie- und Handelskammer Düsseldorf
              <br />
              Ernst-Schneider-Platz 1
              <br />
              40212 Düsseldorf
            </p>

            <p>
              <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong>
              <br />
              {company.owner}
              <br />
              {company.addressLine1}
              <br />
              {company.addressLine2}
            </p>

            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>

            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>

            <p>
              Für eigene Inhalte auf diesen Seiten gelten die allgemeinen gesetzlichen
              Vorschriften. Bei Bekanntwerden konkreter Rechtsverletzungen prüfen wir die
              betroffenen Inhalte und entfernen rechtswidrige Inhalte, soweit erforderlich.
            </p>

            <h2>Haftung für Links</h2>

            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>

            <p>
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <p>
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Links umgehend entfernen.
            </p>

            <h2>Urheberrecht</h2>

            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht.
            </p>

            <p>
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

          </div>
        </section>
      </>
  );
}
import React, {useEffect} from 'react';
import PageHero from '../components/PageHero';
import { company } from '../data/siteContent';

export default function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Impressum"
        title="Rechtliche Angaben"
        text="Bitte prüfe diese Angaben vor Livegang noch einmal rechtlich und ergänze sie bei Bedarf um Register-, Umsatzsteuer- oder Aufsichtsangaben."
      />
      <section className="section">
        <div className="container legal-card">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            {company.owner}
            <br />
            {company.addressLine1}
            <br />
            {company.addressLine2}
          </p>
          <p>
            Telefon: {company.phone}
            <br />
            Fax: {company.fax}
            <br />
            E-Mail: {company.email}
          </p>
          <p>
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
            <br />
            {company.owner}, {company.addressLine1}, {company.addressLine2}
          </p>
        </div>
      </section>
    </>
  );
}

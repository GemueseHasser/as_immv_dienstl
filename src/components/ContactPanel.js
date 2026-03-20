import React from 'react';
import { company, contactHighlights } from '../data/siteContent';

export default function ContactPanel() {
  return (
    <section className="section">
      <div className="container contact-grid compact-shell">
        <article className="contact-card primary">
          <p className="eyebrow">AS Immobilienverwaltung &amp; Dienstleistungen</p>
          <h2>Ihr Ansprechpartner in Wülfrath für Bestandsbetreuung und Leistungen rund um Fläche und Gelände.</h2>
          <p>
            Anfragen werden direkt aufgenommen und dem passenden Bereich zugeordnet. So lassen sich
            Verwaltungsfragen, technische Themen, Außenarbeiten und projektbezogene Abstimmungen
            ohne Umwege besprechen.
          </p>
          <div className="contact-stack">
            <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>
              {company.addressLine1}
              <br />
              {company.addressLine2}
            </p>
            <p>Fax: {company.fax}</p>
          </div>
        </article>
        <article className="contact-card">
          <p className="eyebrow">Anliegen</p>
          <h3>Wobei AS Immobilienverwaltung &amp; Dienstleistungen direkt unterstützen kann</h3>
          <ul className="clean-list compact">
            {contactHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

import React, { useContext } from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import ServicesGallery from '../components/ServicesGallery';
import { ContactModalContext } from '../App';
import { dienstleistungsGallery, dienstleistungsServices } from '../data/siteContent';

export default function DienstleistungenPage() {
  const { openContact } = useContext(ContactModalContext);

  return (
    <>
      <PageHero
        eyebrow="Dienstleistungen"
        title="Praktische Leistungen mit sauberer Ausführung und klarer Koordination."
        text="Der Dienstleistungsbereich konzentriert sich auf Erdarbeiten, Pflasterflächen, Zuwegungen, vorbereitende Maßnahmen, passenden Maschineneinsatz und BIM-gestützte Abstimmung bei anspruchsvolleren Abläufen."
        actions={<button type="button" className="button button-brand" onClick={openContact}>Anfrage zu Dienstleistungen</button>}
        aside={<p>Reale Projektbilder zeigen Leistungen aus dem Objektumfeld – vom Unterbau über Trassen bis zur ausgeführten Fläche und digitalen Koordination.</p>}
      />
      <section className="section">
        <div className="container stack-gap compact-shell">
          <div className="section-head">
            <p className="eyebrow">Leistungsfelder</p>
            <h2>Außenarbeiten, Gelände, Ausführung und Building Information Modeling in einem klar geführten Bereich.</h2>
          </div>
          <ServiceGrid items={dienstleistungsServices} />
          <ServicesGallery items={dienstleistungsGallery} />
        </div>
      </section>
    </>
  );
}

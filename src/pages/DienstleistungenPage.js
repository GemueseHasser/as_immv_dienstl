import React, { useEffect } from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import ServicesGallery from '../components/ServicesGallery';
import { dienstleistungsGallery, dienstleistungsServices } from '../data/siteContent';

export default function DienstleistungenPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <PageHero
        eyebrow="Dienstleistungen"
        title="Praktische Leistungen mit präziser Ausführung und digitaler Koordination."
        text="Der Dienstleistungsbereich konzentriert sich auf Erdarbeiten, Pflasterflächen, Zuwegungen, vorbereitende Maßnahmen, passenden Maschineneinsatz und BIM-gestützte Abstimmung bei anspruchsvolleren Abläufen."
        logoType="dienstleistungen"
        aside={(
          <div className="space-panel">
            <p>Reale Projektbilder zeigen Außenflächen, Trassen, Maschineneinsatz und BIM als eigenständigen Baustein für strukturierte Projektkoordination.</p>
            <div className="space-panel-orbs" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      />
      <section className="section">
        <div className="container stack-gap compact-shell">
          <div className="section-head">
            <p className="eyebrow">Leistungsfelder</p>
            <h2>Außenarbeiten, Gelände, Ausführung und Building Information Modeling in einem klar geführten Bereich.</h2>
          </div>
          <ServiceGrid items={dienstleistungsServices} logoType="dienstleistungen" />
          <ServicesGallery items={dienstleistungsGallery} />
        </div>
      </section>
    </>
  );
}

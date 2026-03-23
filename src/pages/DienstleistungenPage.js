import React, { useEffect } from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import InstagramEmbed from '../components/InstagramEmbed';
import ServicesGallery from '../components/ServicesGallery';
import { dienstleistungsGallery, dienstleistungsServices } from '../data/siteContent';

export default function DienstleistungenPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <PageHero
        title="Praktische Leistungen mit präziser Ausführung und digitaler Koordination."
        text="Der Dienstleistungsbereich konzentriert sich auf Erdarbeiten, Pflasterflächen, Zuwegungen, vorbereitende Maßnahmen, passenden Maschineneinsatz und BIM-gestützte Abstimmung bei anspruchsvolleren Abläufen."
        logoType="dienstleistungen"
        aside={(
          <div className="space-panel">
            <div className="space-panel-copy">
              <p>Reale Projektbilder zeigen Außenflächen, Trassen, Maschineneinsatz und BIM als eigenständigen Baustein für strukturierte Projektkoordination.</p>
            </div>

            <InstagramEmbed
              className="space-panel-instagram"
              title="Instagram Feed von bagger_extreme"
              embedUrl="https://www.instagram.com/bagger_extreme/embed"
            />

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
          <div className="section-head section-head-with-logo">
            <div>
              <p className="eyebrow">Leistungsfelder</p>
              <h2>Außenarbeiten, Gelände, Ausführung und Building Information Modeling in einem klar geführten Bereich.</h2>
            </div>
          </div>
          <ServiceGrid items={dienstleistungsServices} logoType="dienstleistungen" />
          <ServicesGallery items={dienstleistungsGallery} />
        </div>
      </section>
    </>
  );
}

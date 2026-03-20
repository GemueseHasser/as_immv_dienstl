import React from 'react';
import HeroSplit from '../components/HeroSplit';
import HighlightBand from '../components/HighlightBand';
import ServiceGrid from '../components/ServiceGrid';
import { homeHighlights, homeTeasers } from '../data/siteContent';

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <HighlightBand items={homeHighlights} />
      <section className="section">
        <div className="container stack-gap compact-shell">
          <div className="section-head row-head">
            <div>
              <p className="eyebrow">Leistungsprofil</p>
              <h2>AS Immobilienverwaltung &amp; Dienstleistungen verbindet strukturierte Betreuung mit praktischer Ausführung.</h2>
            </div>
          </div>
          <ServiceGrid items={homeTeasers} />
        </div>
      </section>
    </>
  );
}

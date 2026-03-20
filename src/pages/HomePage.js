import React, { useContext } from 'react';
import HeroSplit from '../components/HeroSplit';
import HighlightBand from '../components/HighlightBand';
import ServiceGrid from '../components/ServiceGrid';
import { ContactModalContext } from '../App';
import { homeHighlights, homeTeasers } from '../data/siteContent';

export default function HomePage() {
  const { openContact } = useContext(ContactModalContext);

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
            <div className="hero-actions hero-actions-inline">
              <button type="button" className="button button-ghost" onClick={openContact}>Anfrage stellen</button>
            </div>
          </div>
          <ServiceGrid items={homeTeasers} />
        </div>
      </section>
    </>
  );
}

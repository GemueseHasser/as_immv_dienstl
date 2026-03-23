import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeroSplit from '../components/HeroSplit';
import MobileSnapCarousel from '../components/MobileSnapCarousel';
import ServiceGrid from '../components/ServiceGrid';
import { homeTeasers, strandCards } from '../data/siteContent';

export default function HomePage() {
  const areaRef = useRef(null);
  const highlightTimerRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => () => window.clearTimeout(highlightTimerRef.current), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewAreas = () => {
    areaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlighted(true);
    window.clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = window.setTimeout(() => setHighlighted(false), 2200);
  };

  return (
    <>
      <HeroSplit onViewAreas={handleViewAreas} />

      <section className="section home-areas-section">
        <div className="container compact-shell">
          <div ref={areaRef} className={`home-areas-shell ${highlighted ? 'is-highlighted' : ''}`}>
            <div className="section-head row-head home-areas-head">
              <div>
                <p className="eyebrow">Bereiche</p>
              </div>
            </div>

            <MobileSnapCarousel className="home-areas-grid">
              {strandCards.map((card) => (
                <article
                  key={card.id}
                  className={`split-card split-card-${card.id} home-area-card ${highlighted ? 'pulse-in' : ''}`}
                >
                  <div className="split-card-topline">
                    <p className="eyebrow">{card.eyebrow}</p>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.intro}</p>
                  <NavLink to={card.to} className="button button-light home-area-button">
                    Bereich öffnen
                  </NavLink>
                </article>
              ))}
            </MobileSnapCarousel>
          </div>
        </div>
      </section>

      <section className="section home-profile-section">
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

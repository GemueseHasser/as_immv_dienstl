import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ContactModalContext } from '../App';
import { company, strandCards } from '../data/siteContent';
import MobileSnapCarousel from './MobileSnapCarousel';

export default function HeroSplit() {
  const { openContact } = useContext(ContactModalContext);

  return (
    <section className="hero hero-split">
      <div className="hero-orbit hero-orbit-left" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-right" aria-hidden="true" />
      <div className="container hero-shell compact-shell">
        <div className="hero-copy hero-copy-tight home-intro">
          <p className="eyebrow">{company.name}</p>
          <h1>Zwei Leistungsbereiche. Klar geführt. Ruhig gestaltet.</h1>
          <p className="lead">
            In Wülfrath verbindet AS Immobilienverwaltung &amp; Dienstleistungen die strukturierte
            Betreuung von Wohn- und Gewerbeimmobilien mit praktischen Leistungen im Außenbereich.
            Wählen Sie den Bereich, der zu Ihrem Anliegen passt.
          </p>
          <div className="hero-actions hero-actions-home">
            <NavLink to="/immobilienverwaltung" className="button button-brand">
              Immobilienverwaltung öffnen
            </NavLink>
            <NavLink to="/dienstleistungen" className="button button-light">
              Dienstleistungen öffnen
            </NavLink>
            <button type="button" className="button button-ghost" onClick={openContact}>
              Anfrage stellen
            </button>
          </div>
        </div>
        <MobileSnapCarousel className="split-grid split-grid-elevated">
          {strandCards.map((card) => (
            <article key={card.id} className={`split-card split-card-${card.id}`}>
              <div className="split-card-topline">
                <p className="eyebrow">{card.eyebrow}</p>
                <span className="split-pill">{card.pill}</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.intro}</p>
              <ul className="clean-list">
                {card.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <NavLink to={card.to} className="button button-light">
                Bereich öffnen
              </NavLink>
            </article>
          ))}
        </MobileSnapCarousel>
      </div>
    </section>
  );
}

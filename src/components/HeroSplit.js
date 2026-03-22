import React from 'react';
import { company } from '../data/siteContent';

export default function HeroSplit({ onViewAreas }) {
  return (
    <section className="hero hero-split">
      <div className="hero-orbit hero-orbit-left" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-right" aria-hidden="true" />
      <div className="container hero-shell compact-shell">
        <div className="hero-copy hero-copy-tight home-intro home-intro-wide">
          <p className="eyebrow">{company.name}</p>
          <h1>Zwei Leistungsbereiche. Klar geführt. Ruhig gestaltet.</h1>
          <p className="lead">
            In Wülfrath verbindet AS Immobilienverwaltung &amp; Dienstleistungen die strukturierte
            Betreuung von Wohn- und Gewerbeimmobilien mit praktischen Leistungen im Außenbereich.
            Entdecken Sie beide Bereiche in einer klaren, modernen Übersicht.
          </p>
          <div className="hero-actions hero-actions-home hero-actions-home-single">
            <button type="button" className="button button-brand" onClick={onViewAreas}>
              Bereiche ansehen
            </button>
          </div>
          <div className="hero-inline-note soft-card hero-inline-note-card">
            <p className="eyebrow">Übersicht</p>
            <h3>Immobilienverwaltung und Dienstleistungen auf einen Blick</h3>
            <p>
              Scrollen Sie direkt zu den beiden Bereichen und wählen Sie anschließend den passenden
              Schwerpunkt für Ihr Anliegen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

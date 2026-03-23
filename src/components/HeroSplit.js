import React from 'react';

export default function HeroSplit({ onViewAreas }) {
  return (
    <section className="hero hero-split hero-home-watermark">
      <div className="hero-background-stage" aria-hidden="true">
        <div
          className="hero-background-image"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/start-hero.jpg)` }}
        />
        <div className="hero-background-wash hero-background-wash-left" />
        <div className="hero-background-wash hero-background-wash-right" />
        <div className="hero-background-grid" />
        <div className="hero-background-soft-edge" />
      </div>
      <div className="hero-orbit hero-orbit-left" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-right" aria-hidden="true" />
      <div className="container hero-shell compact-shell">
        <div className="hero-copy hero-copy-tight home-intro home-intro-wide">
          <h1>Von der Verwaltung bis zur Umsetzung – wir kümmern uns</h1>
          <p className="lead">
            AS Immobilienverwaltung &amp; Dienstleistungen steht für langjährige Praxis,
            strukturierte Ausführung und fachlich abgesicherte Qualität in Betreuung von Wohn- und Gewerbeimmobilien,
            Maschineneinsatz und digitalen Projektlösungen für anspruchsvolle Aufgaben.
          </p>
          <div className="hero-actions hero-actions-home hero-actions-home-single">
            <button type="button" className="button button-brand" onClick={onViewAreas}>
              Bereiche ansehen
            </button>
          </div>
          <div className="hero-inline-note soft-card hero-inline-note-card">
            <div>
              <p className="eyebrow">Übersicht</p>
              <h3>Immobilienverwaltung und Dienstleistungen auf einen Blick</h3>
              <p>
                Über 25 Jahre Erfahrung und durch die IHK Düsseldorf zertifiziert. Scrollen Sie direkt zu den beiden
                Bereichen und wählen Sie anschließend den passenden Schwerpunkt für Ihr Anliegen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

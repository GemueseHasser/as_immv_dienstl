import React, { useContext, useEffect } from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import ExpandableReferences from '../components/ExpandableReferences';
import { references, verwaltungServices } from '../data/siteContent';
import { ContactModalContext } from '../App';

export default function VerwaltungPage() {
  const { openContact } = useContext(ContactModalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Immobilienverwaltung mit Überblick, Ruhe und klarer Zuständigkeit."
        text="AS Immobilienverwaltung begleitet Wohn- und Gewerbeimmobilien mit geordneten Abläufen, persönlicher Erreichbarkeit und technischer Übersicht im laufenden Bestand."
        logoType="immobilien"
        actions={(
          <button
            type="button"
            className="button button-brand button-brand-strong"
            onClick={() => openContact({ initialCategory: 'immobilienverwaltung' })}
          >
            Anfrage stellen
          </button>
        )}
        aside={<p>Im Mittelpunkt stehen eine verlässliche Betreuung, kurze Wege und eine strukturierte Abstimmung aller laufenden Themen rund um das Objekt.</p>}
      />
      <section className="section verwaltung-content-section">
        <div className="container stack-gap compact-shell verwaltung-stack">
          <div className="section-head section-head-with-logo">
            <div>
              <p className="eyebrow">Leistungsbild</p>
              <h2>Persönlich organisiert, nachvollziehbar geführt und auf dauerhafte Bestandsqualität ausgerichtet.</h2>
            </div>
          </div>
          <ServiceGrid items={verwaltungServices} logoType="immobilien" />
          <ExpandableReferences items={references} />
        </div>
      </section>
    </>
  );
}

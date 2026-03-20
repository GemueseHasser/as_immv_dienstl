import React, {useContext, useEffect} from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import HighlightBand from '../components/HighlightBand';
import ExpandableReferences from '../components/ExpandableReferences';
import { ContactModalContext } from '../App';
import { references, verwaltungHighlights, verwaltungServices } from '../data/siteContent';

export default function VerwaltungPage() {
  const { openContact } = useContext(ContactModalContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <PageHero
        eyebrow="Immobilienverwaltung"
        title="Immobilienverwaltung mit Überblick, Ruhe und klarer Zuständigkeit."
        text="AS Immobilienverwaltung begleitet Wohn- und Gewerbeimmobilien mit geordneten Abläufen, persönlicher Erreichbarkeit und technischer Übersicht im laufenden Bestand."
        actions={<button type="button" className="button button-brand" onClick={openContact}>Anfrage zur Immobilienverwaltung</button>}
        aside={<p>Im Mittelpunkt stehen eine verlässliche Betreuung, kurze Wege und eine strukturierte Abstimmung aller laufenden Themen rund um das Objekt.</p>}
      />
      <HighlightBand items={verwaltungHighlights} />
      <section className="section">
        <div className="container stack-gap compact-shell">
          <div className="section-head">
            <p className="eyebrow">Leistungsbild</p>
            <h2>Persönlich organisiert, nachvollziehbar geführt und auf dauerhafte Bestandsqualität ausgerichtet.</h2>
          </div>
          <ServiceGrid items={verwaltungServices} />
          <ExpandableReferences items={references} />
        </div>
      </section>
    </>
  );
}

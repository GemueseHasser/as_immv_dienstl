import React, { useContext, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import ExpandableReferences from '../components/ExpandableReferences';
import { PremiumButton } from '../components/ui';
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
        className="verwaltung-hero"
        title="Immobilienverwaltung mit Überblick, Ruhe und klarer Zuständigkeit."
        text="AS Immobilienverwaltung begleitet Wohn- und Gewerbeimmobilien mit geordneten Abläufen, persönlicher Erreichbarkeit und technischer Übersicht im laufenden Bestand."
        logoType="immobilien"
        actions={(
          <PremiumButton
            type="button"
            endIcon={<SendRoundedIcon />}
            onClick={() => openContact({ initialCategory: 'immobilienverwaltung' })}
          >
            Anfrage stellen
          </PremiumButton>
        )}
        aside={(
          <div className="page-hero-media-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/immobilienverwaltung-digital-hero.png`}
              alt="Digitale Immobilienverwaltung mit Laptop, Rechner und Schlüsseln"
              className="page-hero-media"
            />
          </div>
        )}
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

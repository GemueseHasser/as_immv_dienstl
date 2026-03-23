import React, { useContext, useEffect } from 'react';
import PageHero from '../components/PageHero';
import ServiceGrid from '../components/ServiceGrid';
import InstagramEmbed from '../components/InstagramEmbed';
import ServicesGallery from '../components/ServicesGallery';
import { dienstleistungsGallery, dienstleistungsServices } from '../data/siteContent';
import { ContactModalContext } from '../App';

export default function DienstleistungenPage() {
  const { openContact } = useContext(ContactModalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Mietmaschinist, Maschine und digitale Lösungen für anspruchsvolle Einsätze."
        text="Gebucht werden kann entweder ein Mietmaschinist als eigenständige Dienstleistung oder ein Maschinist inklusive Maschine. Ergänzt wird das Angebot durch 3D-gesteuerten Maschineneinsatz mit Tiltrotatoren und verschiedensten Anbaugeräten sowie digitale Lösungen wie digitale Geländemodelle (DGM), Punktwolken, 3D-Scanning und BIM-Unterstützung."
        logoType="dienstleistungen"
        actions={(
          <button
            type="button"
            className="button button-brand button-brand-strong"
            onClick={() => openContact({ initialCategory: 'dienstleistungen' })}
          >
            Anfrage stellen
          </button>
        )}
        aside={(
          <div className="space-panel">
            <div className="space-panel-copy">
              <p>
                Auf dem Instagram-Account werden regelmäßig aktuelle Projekte vorgestellt.
              </p>
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
              <h2>Maschineneinsatz, Anbaugeräte und digitale Unterstützung in einem klar geführten Bereich.</h2>
            </div>
          </div>
          <ServiceGrid items={dienstleistungsServices} logoType="dienstleistungen" />

          <div className="section-head row-head">
            <div>
              <p className="eyebrow">Bildergalerie</p>
              <h2>Einblick in Projekte und Möglichkeiten.</h2>
            </div>
          </div>
          <ServicesGallery items={dienstleistungsGallery} />
        </div>
      </section>
    </>
  );
}

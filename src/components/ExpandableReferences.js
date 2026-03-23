import React, { useState } from 'react';

export default function ExpandableReferences({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="inline-references references-showcase">
      <div className="references-showcase-frame">
        <div className="inline-references-head references-showcase-head">
          <div>
            <p className="eyebrow">Referenzen</p>
            <h3>Ausgewählte betreute Immobilien durch die AS-Immobilienverwaltung</h3>
            <div className="reference-hints" aria-hidden="true">
              {items.map((item) => (
                <span key={item.title} className="reference-hint-chip">{item.title}</span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`button button-light disclosure-button disclosure-button-premium ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            <span className="disclosure-copy">
              <strong>{open ? 'Referenzen schließen' : 'Referenzen öffnen'}</strong>
              <small>{open ? 'Ansicht wieder einklappen' : 'Bilder und Objektinfos anzeigen'}</small>
            </span>
            <span className="disclosure-icon">▾</span>
          </button>
        </div>

        <div className={`references-drawer ${open ? 'is-open' : ''}`}>
          <div className="references-grid">
            {items.map((item) => (
              <article
                key={item.title}
                className={`reference-spotlight reference-spotlight-${item.accent || 'default'}`}
              >
                <div className="reference-image-wrap">
                  <img src={item.image} alt={item.title} className="reference-image" />
                  <div className="reference-image-overlay" />
                </div>
                <div className="reference-spotlight-copy">
                  <div className="reference-spotlight-top">
                    <div>
                      <p className="eyebrow">{item.type}</p>
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

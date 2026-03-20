import React, { useState } from 'react';

export default function ExpandableReferences({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="inline-references soft-card">
      <div className="inline-references-head">
        <div>
          <p className="eyebrow">Referenzen</p>
          <h3>Referenzen aus dem Verwaltungsumfeld</h3>
          <p>
            Ausgewählte Objektbezüge aus Wülfrath und dem regionalen Bestand – direkt innerhalb
            der Immobilienverwaltung.
          </p>
          <div className="reference-hints" aria-hidden="true">
            {items.slice(0, 2).map((item) => (
              <span key={item.title} className="reference-hint-chip">{item.title}</span>
            ))}
            <span className="reference-hint-chip subtle">{items.length} Einträge</span>
          </div>
        </div>
        <button
          type="button"
          className={`button button-light disclosure-button ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <span>{open ? 'Referenzen ausblenden' : 'Referenzen anzeigen'}</span>
          <span className="disclosure-icon">▾</span>
        </button>
      </div>

      {open ? (
        <div className="reference-list reference-list-inline">
          {items.map((item) => (
            <article key={item.title} className="reference-row">
              <div>
                <p className="eyebrow">{item.type}</p>
                <h4>{item.title}</h4>
                <small>{item.meta}</small>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

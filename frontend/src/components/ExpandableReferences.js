import React, { useMemo, useState } from 'react';

function ReferenceThumbnailButton({ item, index, isActive, onClick, compact = false }) {
  return (
    <button
      type="button"
      className={`reference-thumbnail-card ${compact ? 'reference-thumbnail-card-compact' : ''} ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className="reference-thumbnail-image-wrap">
        <img src={item.image} alt={item.title} className="reference-thumbnail-image" />
      </span>
      <span className="reference-thumbnail-copy">
        <small>{String(index + 1).padStart(2, '0')}</small>
        <strong>{item.title}</strong>
      </span>
    </button>
  );
}

export default function ExpandableReferences({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items?.[activeIndex] || items?.[0];
  const totalItems = items?.length || 0;

  const previewLabel = useMemo(() => {
    if (!activeItem) return '';
    return `${String(activeIndex + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;
  }, [activeIndex, activeItem, totalItems]);

  if (!items?.length) {
    return null;
  }

  return (
    <section className="inline-references references-showcase references-showcase-premium">
      <div className="references-showcase-frame references-showcase-frame-premium">
        <div className="inline-references-head references-showcase-head references-showcase-head-premium">
          <div>
            <p className="eyebrow">Referenzen</p>
            <h3>Ausgewählte betreute Immobilien durch die AS-Immobilienverwaltung</h3>
          </div>
        </div>

        <div className="references-gallery-shell references-gallery-shell-premium">
          {activeItem && (
            <article className={`reference-stage reference-stage-premium reference-stage-${activeItem.accent || 'default'}`}>
              <div className="reference-stage-image-wrap">
                <img src={activeItem.image} alt={activeItem.title} className="reference-stage-image" />
                <div className="reference-stage-overlay reference-stage-overlay-premium" />
              </div>
              <div className="reference-stage-copy reference-stage-copy-premium">
                <div className="reference-stage-meta">
                  <span className="reference-stage-counter">{previewLabel}</span>
                  <span className="reference-stage-chip">Betreute Immobilie</span>
                </div>
                <h4>{activeItem.title}</h4>
              </div>
            </article>
          )}

          <aside className="references-aside-panel references-aside-panel-desktop" aria-label="Objektübersicht">
            <div className="references-aside-panel-head">
              <p className="eyebrow">Objektübersicht</p>
              <span>{String(totalItems).padStart(2, '0')} Immobilien</span>
            </div>

            <div className="references-thumbnail-grid" role="tablist" aria-label="Betreute Immobilien">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <ReferenceThumbnailButton
                    key={`${item.title}-desktop-thumb`}
                    item={item}
                    index={index}
                    isActive={isActive}
                    onClick={() => setActiveIndex(index)}
                    compact
                  />
                );
              })}
            </div>
          </aside>
        </div>

        <div className="references-thumbnail-rail references-thumbnail-rail-mobile" aria-label="Bildvorschau betreuter Immobilien">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <ReferenceThumbnailButton
                key={`${item.title}-thumb`}
                item={item}
                index={index}
                isActive={isActive}
                onClick={() => setActiveIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

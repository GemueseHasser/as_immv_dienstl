import React from 'react';
import MobileSnapCarousel from './MobileSnapCarousel';
import BrandLogos from './BrandLogos';

export default function ServiceGrid({ items, logoType = null }) {
  return (
    <MobileSnapCarousel className="card-grid">
      {items.map((item) => (
        <article key={item.title} className={["soft-card", logoType ? 'soft-card-with-brand' : ''].filter(Boolean).join(' ')}>
          <div className="soft-card-copy">
            {item.tag ? <p className="eyebrow">{item.tag}</p> : null}
            {logoType ? (
              <div className="soft-card-brand-mark" aria-hidden="true">
                <BrandLogos variant="watermark" single={logoType} />
              </div>
            ) : null}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </MobileSnapCarousel>
  );
}

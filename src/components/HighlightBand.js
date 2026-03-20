import React from 'react';
import MobileSnapCarousel from './MobileSnapCarousel';

export default function HighlightBand({ items }) {
  return (
    <section className="highlight-band">
      <div className="container">
        <MobileSnapCarousel className="highlight-grid">
          {items.map((item) => (
            <div key={item} className="highlight-item">
              <span />
              <p>{item}</p>
            </div>
          ))}
        </MobileSnapCarousel>
      </div>
    </section>
  );
}

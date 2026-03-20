import React from 'react';

export default function HighlightBand({ items }) {
  return (
    <section className="highlight-band">
      <div className="container highlight-grid">
        {items.map((item) => (
          <div key={item} className="highlight-item">
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

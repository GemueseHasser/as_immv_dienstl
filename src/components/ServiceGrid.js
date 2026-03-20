import React from 'react';
import MobileSnapCarousel from './MobileSnapCarousel';

export default function ServiceGrid({ items }) {
  return (
    <MobileSnapCarousel className="card-grid">
      {items.map((item) => (
        <article key={item.title} className="soft-card">
          {item.tag ? <p className="eyebrow">{item.tag}</p> : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </MobileSnapCarousel>
  );
}

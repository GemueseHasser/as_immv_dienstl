import React from 'react';

export default function ServicesGallery({ items }) {
  return (
    <div className="services-gallery">
      {items.map((item) => (
        <article key={item.title} className="gallery-card">
          <img src={item.image} alt={item.title} />
          <div className="gallery-copy">
            <p className="eyebrow">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

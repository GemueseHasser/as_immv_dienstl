import React from 'react';
import MobileSnapCarousel from './MobileSnapCarousel';

export default function ServicesGallery({ items }) {
  return (
    <MobileSnapCarousel className="services-gallery services-gallery-mosaic">
      {items.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className={`gallery-card gallery-card-${index + 1} ${item.size ? `gallery-card-${item.size}` : ''}`}
        >
          <div className="gallery-media-wrap">
            <img src={item.image} alt={item.alt || item.title} />
          </div>
          <div className="gallery-copy">
            <p className="eyebrow">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </MobileSnapCarousel>
  );
}

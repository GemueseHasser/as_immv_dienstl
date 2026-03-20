import React from 'react';

export default function ReferenceList({ items }) {
  return (
    <div className="reference-list">
      {items.map((item) => (
        <article key={item.title} className="reference-row">
          <div>
            <p className="eyebrow">{item.type}</p>
            <h3>{item.title}</h3>
            <small>{item.meta}</small>
          </div>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

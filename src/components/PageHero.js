import React from 'react';

export default function PageHero({ eyebrow, title, text, aside, actions }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid compact-shell">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{text}</p>
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {aside ? <div className="page-hero-aside">{aside}</div> : null}
      </div>
    </section>
  );
}

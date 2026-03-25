import React from 'react';
import BrandLogos from './BrandLogos';

export default function PageHero({ eyebrow, title, text, aside, actions, logoType, className = '' }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container page-hero-grid compact-shell">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {logoType ? <BrandLogos variant="hero" single={logoType} className="page-hero-logo" /> : null}
          <h1>{title}</h1>
          <p className="lead">{text}</p>
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {aside ? <div className="page-hero-aside">{aside}</div> : null}
      </div>
    </section>
  );
}

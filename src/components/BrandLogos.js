import React from 'react';

const publicAsset = (path) => `${process.env.PUBLIC_URL || ''}${path}`;

export const brandLogoMap = {
  immobilien: {
    src: publicAsset('/as-immobilienverwaltung-schwarz.png'),
    alt: 'AS Immobilienverwaltung Logo',
  },
  dienstleistungen: {
    src: publicAsset('/as-dienstleistungen-schwarz.png'),
    alt: 'AS Dienstleistungen Logo',
  },
};

export default function BrandLogos({ variant = 'header', single = null, className = '' }) {
  const logos = single ? [brandLogoMap[single]].filter(Boolean) : Object.values(brandLogoMap);

  return (
    <div className={[`brand-logos brand-logos-${variant}`, className].filter(Boolean).join(' ')}>
      {logos.map((logo) => (
        <div key={logo.alt} className="brand-logo-card">
          <img src={logo.src} alt={logo.alt} className="brand-logo-image" loading="eager" />
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { company } from '../../data/siteContent';

export default function Header({ onOpenContact }) {
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentLabel = pathname.startsWith('/immobilienverwaltung')
    ? 'Immobilienverwaltung'
    : pathname.startsWith('/dienstleistungen')
      ? 'Dienstleistungen'
      : pathname.startsWith('/kontakt')
        ? 'Kontakt'
        : 'Wülfrath';

  const navItems = [
    { label: 'Start', to: '/' },
    { label: 'Immobilienverwaltung', to: '/immobilienverwaltung', emphasis: true },
    { label: 'Dienstleistungen', to: '/dienstleistungen', emphasis: true },
    { label: 'Kontakt', to: '/kontakt' },
  ];

  useEffect(() => {
    const node = navRef.current;
    if (!node) return undefined;

    const updateScrollState = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      setCanScrollLeft(node.scrollLeft > 6);
      setCanScrollRight(maxScrollLeft - node.scrollLeft > 6);
    };

    updateScrollState();
    node.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [pathname]);

  const scrollNav = (direction) => {
    const node = navRef.current;
    if (!node) return;
    node.scrollBy({ left: direction === 'left' ? -180 : 180, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="header-aurora" aria-hidden="true" />
      <div className="container header-topline compact-shell">
        <p>{company.owner}</p>
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </div>

      <div className="container header-bar compact-shell">
        <NavLink to="/" className="brand">
          <span className="brand-mark">AS</span>
          <span className="brand-copy">
            <strong>{company.name}</strong>
            <small>{currentLabel}</small>
          </span>
        </NavLink>

        <nav className="main-nav desktop-nav" aria-label="Hauptnavigation">
          <div className="nav-primary nav-primary-premium">
            {navItems.map((item) => (
              <div key={item.label} className="nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'nav-link',
                      item.emphasis ? 'nav-link-area' : '',
                      isActive ? 'active' : '',
                    ].filter(Boolean).join(' ')
                  }
                >
                  <span className="nav-link-label">{item.label}</span>
                  {item.emphasis ? <span className="nav-link-glow" aria-hidden="true" /> : null}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="nav-cta-group">
            <NavLink to="/impressum" className="nav-link subtle">
              Impressum
            </NavLink>
            <button type="button" className="button button-brand" onClick={onOpenContact}>
              Anfrage
            </button>
          </div>
        </nav>
      </div>

      <div className="mobile-floating-nav-wrap">
        <div className="container compact-shell mobile-floating-nav-shell">
          <button
            type="button"
            className={`mobile-nav-arrow mobile-nav-arrow-left ${canScrollLeft ? 'is-visible' : 'is-hidden'}`}
            onClick={() => scrollNav('left')}
            aria-label="Navigation nach links scrollen"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <nav ref={navRef} className="mobile-floating-nav" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'mobile-floating-link',
                    item.emphasis ? 'is-emphasis' : '',
                    isActive ? 'active' : '',
                  ].filter(Boolean).join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className={`mobile-nav-arrow mobile-nav-arrow-right ${canScrollRight ? 'is-visible' : 'is-hidden'}`}
            onClick={() => scrollNav('right')}
            aria-label="Navigation nach rechts scrollen"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </header>
  );
}

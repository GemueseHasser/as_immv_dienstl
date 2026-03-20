import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { company } from '../../data/siteContent';

export default function Header({ onOpenContact }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
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

  return (
    <header className="site-header">
      <div className="header-aurora" aria-hidden="true" />
      <div className="container header-topline compact-shell">
        <p>{company.owner}</p>
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </div>
      <div className="container header-bar compact-shell">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">AS</span>
          <span>
            <strong>{company.name}</strong>
            <small>{currentLabel}</small>
          </span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label="Navigation öffnen"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
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
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-link-label">{item.label}</span>
                  {item.emphasis ? <span className="nav-link-glow" aria-hidden="true" /> : null}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="nav-cta-group">
            <NavLink to="/impressum" className="nav-link subtle" onClick={() => setOpen(false)}>
              Impressum
            </NavLink>
            <button
              type="button"
              className="button button-brand"
              onClick={() => {
                setOpen(false);
                onOpenContact();
              }}
            >
              Anfrage
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

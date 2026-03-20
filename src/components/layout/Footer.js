import React from 'react';
import { NavLink } from 'react-router-dom';
import { company } from '../../data/siteContent';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid compact-shell">
        <div>
          <p className="eyebrow">AS Immobilienverwaltung &amp; Dienstleistungen</p>
          <h3>{company.owner}</h3>
          <p>
            {company.addressLine1}
            <br />
            {company.addressLine2}
          </p>
        </div>
        <div>
          <h4>Bereiche</h4>
          <div className="footer-links">
            <NavLink to="/">Start</NavLink>
            <NavLink to="/immobilienverwaltung">Immobilienverwaltung</NavLink>
            <NavLink to="/dienstleistungen">Dienstleistungen</NavLink>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </div>
        </div>
        <div>
          <h4>Rechtliches</h4>
          <div className="footer-links">
            <NavLink to="/impressum">Impressum</NavLink>
            <NavLink to="/datenschutz">Datenschutz</NavLink>
          </div>
        </div>
        <div>
          <h4>Direkt</h4>
          <div className="footer-links">
            <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={`https://${company.website}`} target="_blank" rel="noreferrer">{company.website}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

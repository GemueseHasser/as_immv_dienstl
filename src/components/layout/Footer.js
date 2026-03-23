import React from 'react';
import { NavLink } from 'react-router-dom';
import { company } from '../../data/siteContent';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
      <footer className="site-footer">
        <div className="container footer-grid compact-shell">
            <div>
                <p className="eyebrow">AS Immobilienverwaltung &amp; Dienstleistungen</p>
                <h3>Social Media</h3>
                <div className="footer-column footer-column-instagram">
                    <a
                        href="https://www.instagram.com/bagger_extreme/"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none'
                        }}
                    >
                        <InstagramIcon
                            style={{
                                fontSize: '40px',
                                color: '#E1306C',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    </a>
                </div>
            </div>

          <div className="footer-column footer-column-areas">
            <h4>Bereiche</h4>
            <div className="footer-links">
              <NavLink to="/">Start</NavLink>
              <NavLink to="/immobilienverwaltung">Immobilienverwaltung</NavLink>
              <NavLink to="/dienstleistungen">Dienstleistungen</NavLink>
              <NavLink to="/kontakt">Kontakt</NavLink>
            </div>
          </div>

          <div className="footer-column footer-column-legal">
            <h4>Rechtliches</h4>
            <div className="footer-links">
              <NavLink to="/impressum">Impressum</NavLink>
              <NavLink to="/datenschutz">Datenschutz</NavLink>
            </div>
          </div>

          <div className="footer-column footer-column-direct">
            <h4>Direkt</h4>
            <div className="footer-links">
              <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={`https://${company.website}`} target="_blank" rel="noreferrer">
                {company.website}
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
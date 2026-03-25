import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { company } from '../../data/siteContent';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid compact-shell footer-grid-classic">
        <div className="footer-column footer-brand-card">
          <p className="eyebrow">AS Immobilienverwaltung &amp; Dienstleistungen</p>
          <h3>Social Media</h3>
          <div className="footer-column footer-column-instagram">
            <IconButton
              component="a"
              href="https://www.instagram.com/bagger_extreme/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram öffnen"
              className="footer-social-button"
            >
              <InstagramIcon />
            </IconButton>
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
          <div className="footer-links footer-links-direct">
            <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}><PhoneRoundedIcon fontSize="small" /> {company.phone}</a>
            <a href={`mailto:${company.email}`}><MailOutlineRoundedIcon fontSize="small" /> {company.email}</a>
            <a href={`https://${company.website}`} target="_blank" rel="noreferrer"><LanguageRoundedIcon fontSize="small" /> {company.website}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

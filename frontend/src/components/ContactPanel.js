import React from 'react';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Paper } from '@mui/material';
import { company, contactHighlights } from '../data/siteContent';

export default function ContactPanel() {
  return (
    <section className="section">
      <div className="container contact-grid compact-shell">
        <Paper component="article" elevation={0} className="contact-card primary contact-card-enhanced">
          <p className="eyebrow">AS Immobilienverwaltung &amp; Dienstleistungen</p>
          <h2>Ihr Ansprechpartner in Wülfrath für Bestandsbetreuung und Leistungen rund um Fläche und Gelände.</h2>
          <p>
            Anfragen werden direkt aufgenommen und dem passenden Bereich zugeordnet. So lassen sich
            Verwaltungsfragen, technische Themen, Außenarbeiten und projektbezogene Abstimmungen
            ohne Umwege besprechen.
          </p>
          <div className="contact-stack contact-stack-enhanced">
            <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}><PhoneRoundedIcon fontSize="small" /> {company.phone}</a>
            <a href={`mailto:${company.email}`}><EmailRoundedIcon fontSize="small" /> {company.email}</a>
            <p><LocationOnRoundedIcon fontSize="small" /> {company.addressLine1}<br />{company.addressLine2}</p>
            <p><ApartmentRoundedIcon fontSize="small" /> Fax: {company.fax}</p>
          </div>
        </Paper>
        <Paper component="article" elevation={0} className="contact-card contact-card-enhanced">
          <p className="eyebrow">Anliegen</p>
          <h3>Wobei AS Immobilienverwaltung &amp; Dienstleistungen direkt unterstützen kann</h3>
          <ul className="clean-list compact enhanced-list">
            {contactHighlights.map((item) => (
              <li key={item}><AddTaskRoundedIcon fontSize="small" /> <span>{item}</span></li>
            ))}
          </ul>
        </Paper>
      </div>
    </section>
  );
}

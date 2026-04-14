import React from 'react';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';

export default function AdminDashboardPage() {
  const cards = [
    {
      title: 'Benutzerverwaltung',
      text: 'Alle registrierten Benutzer ansehen und bei Bedarf direkt löschen.',
      to: '/admin/benutzer',
      icon: <GroupRoundedIcon fontSize="large" />,
    },
    {
      title: 'Wohnungsanzeigen',
      text: 'Wohnungsanzeigen erstellen, bearbeiten, veröffentlichen und die Bildgalerie verwalten.',
      to: '/admin/wohnungen',
      icon: <ApartmentRoundedIcon fontSize="large" />,
    },
  ];

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="admin-card">
          <p className="eyebrow">Admin</p>
          <h1>Admin-Bereich</h1>
          <p>Wählen Sie aus, welchen Bereich Sie öffnen möchten.</p>
        </div>
        <div className="admin-dashboard-grid">
          {cards.map((card) => (
            <RouterLink key={card.to} to={card.to} className="admin-dashboard-card">
              <div className="admin-dashboard-icon" aria-hidden="true">{card.icon}</div>
              <div className="stack-gap" style={{ gap: 12 }}>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
              <span className="admin-dashboard-link">Öffnen <ArrowForwardRoundedIcon fontSize="small" /></span>
            </RouterLink>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { CONSENT_SETTINGS, setInstagramConsent } from '../utils/consent';
import useConsent from '../hooks/useConsent';
import { PremiumButton } from './ui';

export default function CookieConsentBanner() {
  const choice = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(CONSENT_SETTINGS, open);
    return () => window.removeEventListener(CONSENT_SETTINGS, open);
  }, []);
  const decide = (allowed) => {
    setInstagramConsent(allowed);
    setSettingsOpen(false);
  };
  const content = (
    <>
      <p>Instagram ist optional und zunächst gesperrt. Mit „Instagram erlauben“ stimmen Sie
        zu, dass wir Beiträge von Meta Platforms Ireland Limited laden. Dabei erhält Meta
        insbesondere Ihre IP-Adresse und Browserdaten und kann Cookies oder ähnliche
        Technologien für Analyse, Profilbildung und personalisierte Werbung verwenden.
        Eine Zuordnung zu Ihrem Instagram-Konto und eine Verarbeitung in den USA sind möglich.</p>
      <p>Ohne Zustimmung können Sie die übrige Website und das Kontaktformular nutzen.
        Ihre Auswahl speichern wir für 180 Tage in diesem Browser. Sie können sie jederzeit
        über „Cookie-Einstellungen“ im Fußbereich ändern oder Ihre Zustimmung widerrufen.</p>
      <p>Notwendig: Speicherung Ihrer Datenschutzauswahl. Optional: ausschließlich Instagram.</p>
      {choice && <p role="status">Instagram ist derzeit {choice.instagram ? 'erlaubt' : 'gesperrt'}.</p>}
      <div className="cookie-choice-actions">
        <PremiumButton type="button" onClick={() => decide(false)}>Alle ablehnen</PremiumButton>
        <PremiumButton type="button" onClick={() => decide(true)}>Instagram erlauben</PremiumButton>
      </div>
      <p className="cookie-legal-links">
        <NavLink to="/datenschutz" onClick={() => setSettingsOpen(false)}>Datenschutz und Details</NavLink>
        {' · '}<NavLink to="/impressum" onClick={() => setSettingsOpen(false)}>Impressum</NavLink>
      </p>
    </>
  );
  const legalPage = ['/datenschutz', '/impressum'].includes(pathname);
  return (
    <>
      {!choice && !settingsOpen && !legalPage && (
        <section className="privacy-banner" aria-labelledby="cookie-banner-title" tabIndex={0}>
          <div className="container compact-shell">
            <h2 id="cookie-banner-title">Ihre Privatsphäre – Ihre Auswahl</h2>
            {content}
          </div>
        </section>
      )}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}
        aria-labelledby="cookie-settings-title" fullWidth maxWidth="sm">
        <DialogTitle id="cookie-settings-title">Cookie-Einstellungen</DialogTitle>
        <DialogContent>
          {content}
          <PremiumButton type="button" variant="outlined" onClick={() => setSettingsOpen(false)}>
            Ohne Änderung schließen
          </PremiumButton>
        </DialogContent>
      </Dialog>
    </>
  );
}

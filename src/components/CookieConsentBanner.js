import React, { useEffect, useState } from 'react';
import CookieRoundedIcon from '@mui/icons-material/CookieRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import { NavLink } from 'react-router-dom';
import { hasSiteCookieConsent, setSiteCookieConsentAccepted } from '../utils/consent';
import { PremiumButton } from './ui';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasSiteCookieConsent());
    const syncConsent = () => setVisible(!hasSiteCookieConsent());
    window.addEventListener('storage', syncConsent);
    window.addEventListener('as-cookie-consent-changed', syncConsent);
    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener('as-cookie-consent-changed', syncConsent);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="cookie-banner-wrap" role="region" aria-label="Cookie-Hinweis">
      <div className="container compact-shell">
        <div className="cookie-banner cookie-banner-enhanced">
          <div className="cookie-banner-copy">
            <p className="eyebrow"><CookieRoundedIcon fontSize="inherit" /> Cookie-Hinweis</p>
            <h3>Externe Inhalte werden erst nach allgemeiner Einwilligung geladen.</h3>
            <p>
              Für die Instagram-Einbettung auf der Dienstleistungsseite werden Cookies und Inhalte
              von Drittanbietern geladen. Mit dem Akzeptieren stimmen Sie dem Laden dieser Inhalte
              auf der Website zu.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <PremiumButton
              type="button"
              onClick={() => {
                setSiteCookieConsentAccepted();
                setVisible(false);
              }}
            >
              Cookies akzeptieren
            </PremiumButton>
            <PremiumButton
              component={NavLink}
              to="/datenschutz"
              variant="outlined"
              startIcon={<PolicyRoundedIcon />}
            >
              Datenschutz
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}

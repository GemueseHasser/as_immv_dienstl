import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { hasSiteCookieConsent, setSiteCookieConsentAccepted } from '../utils/consent';

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
        <div className="cookie-banner">
          <div className="cookie-banner-copy">
            <p className="eyebrow">Cookie-Hinweis</p>
            <h3>Externe Inhalte werden erst nach allgemeiner Einwilligung geladen.</h3>
            <p>
              Für die Instagram-Einbettung auf der Dienstleistungsseite werden Cookies und Inhalte
              von Drittanbietern geladen. Mit dem Akzeptieren stimmen Sie dem Laden dieser Inhalte
              auf der Website zu.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="button button-brand"
              onClick={() => {
                setSiteCookieConsentAccepted();
                setVisible(false);
              }}
            >
              Cookies akzeptieren
            </button>
            <NavLink to="/datenschutz" className="button button-light">
              Datenschutz
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

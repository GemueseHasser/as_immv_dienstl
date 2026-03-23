import React, { useEffect, useState } from 'react';
import { hasSiteCookieConsent } from '../utils/consent';

export default function InstagramEmbed({
  embedUrl,
  title,
  className = '',
}) {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    const syncConsent = () => setConsentGranted(hasSiteCookieConsent());

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener('as-cookie-consent-changed', syncConsent);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener('as-cookie-consent-changed', syncConsent);
    };
  }, []);

  return (
    <div className={['instagram-embed-shell', className].filter(Boolean).join(' ')}>
      {consentGranted ? (
        <iframe
          title={title}
          src={embedUrl}
          loading="lazy"
          allowTransparency
        />
      ) : (
        <div className="instagram-embed-placeholder">
          <p>Instagram wird nach allgemeiner Cookie-Einwilligung geladen.</p>
        </div>
      )}
    </div>
  );
}

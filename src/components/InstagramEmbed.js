import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'as-instagram-consent';

export default function InstagramEmbed({
  profileUrl,
  embedUrl,
  title,
  className = '',
}) {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    try {
      setConsentGranted(window.localStorage.getItem(STORAGE_KEY) === 'granted');
    } catch (error) {
      setConsentGranted(false);
    }
  }, []);

  const acceptInstagramCookies = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'granted');
    } catch (error) {
      // ignore storage access issues
    }
    setConsentGranted(true);
  };

  return (
    <div className={className}>
      {consentGranted ? (
        <>
          <iframe
            title={title}
            src={embedUrl}
            loading="lazy"
            allowTransparency
          />
          <p className="embed-privacy-note">
            Durch das Laden des Instagram-Inhalts können Daten an Meta bzw. Instagram übertragen und Cookies gesetzt werden.
          </p>
        </>
      ) : (
        <div className="embed-consent-card">
          <p className="embed-consent-eyebrow">Externer Inhalt</p>
          <h3>Instagram erst nach Einwilligung laden</h3>
          <p>
            Zum Anzeigen des eingebetteten Instagram-Profils werden Inhalte von Instagram geladen. Dabei können Cookies gesetzt
            und personenbezogene Daten an Drittanbieter übertragen werden.
          </p>
          <div className="embed-consent-actions">
            <button type="button" className="button button-brand" onClick={acceptInstagramCookies}>
              Instagram laden
            </button>
            <a
              className="button button-secondary"
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              Profil direkt öffnen
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

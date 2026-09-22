import React from 'react';
import useConsent from '../hooks/useConsent';
import { openCookieSettings, setInstagramConsent } from '../utils/consent';
import { PremiumButton } from './ui';

export default function InstagramEmbed({ embedUrl, title, className = '' }) {
  const choice = useConsent();
  return (
    <div className={['instagram-embed-shell', className].filter(Boolean).join(' ')}>
      {choice?.instagram === true ? (
        <>
          <PremiumButton type="button" variant="outlined" onClick={() => setInstagramConsent(false)}>
            Instagram deaktivieren / Einwilligung widerrufen
          </PremiumButton>
          <iframe title={title} src={embedUrl} loading="lazy" referrerPolicy="no-referrer" />
        </>
      ) : (
        <div className="instagram-embed-placeholder">
          <p>Instagram ist gesperrt. Erst mit Ihrer freiwilligen Zustimmung wird eine Verbindung zu Meta hergestellt.</p>
          <PremiumButton type="button" onClick={openCookieSettings}>Cookie-Einstellungen öffnen</PremiumButton>
          <p><a href="https://www.instagram.com/bagger_extreme/" target="_blank" rel="noopener noreferrer">
            Stattdessen Instagram extern öffnen
          </a> (verlässt diese Website)</p>
        </div>
      )}
    </div>
  );
}

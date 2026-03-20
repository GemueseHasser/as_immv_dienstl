import React, { useEffect } from 'react';
import { company } from '../data/siteContent';

export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="modal-head">
          <div>
            <p className="eyebrow">Anfrage</p>
            <h2 id="contact-modal-title">Kontaktformular</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Schließen">
            ×
          </button>
        </div>
        <p className="modal-copy">
          Beschreiben Sie Ihr Anliegen kurz. Beim Absenden öffnet sich Ihr E-Mail-Programm mit den
          eingetragenen Daten an {company.email}.
        </p>
        <form
          className="contact-form"
          action={`mailto:${company.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input type="text" name="Name" placeholder="Ihr Name" required />
            </label>
            <label>
              <span>E-Mail</span>
              <input type="email" name="E-Mail" placeholder="ihre@email.de" required />
            </label>
          </div>
          <div className="form-grid">
            <label>
              <span>Telefon</span>
              <input type="tel" name="Telefon" placeholder="Optional" />
            </label>
            <label>
              <span>Bereich</span>
              <select name="Bereich" defaultValue="Immobilienverwaltung">
                <option>Immobilienverwaltung</option>
                <option>Dienstleistungen</option>
                <option>Building Information Modeling (BIM)</option>
                <option>Allgemein</option>
              </select>
            </label>
          </div>
          <label>
            <span>Nachricht</span>
            <textarea name="Nachricht" rows="6" placeholder="Worum geht es bei Ihrem Anliegen?" required />
          </label>
          <div className="form-actions">
            <button type="submit" className="button button-brand">E-Mail vorbereiten</button>
            <button type="button" className="button button-light" onClick={onClose}>Schließen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

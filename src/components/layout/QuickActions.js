import React from 'react';

export default function QuickActions({ onOpenContact }) {
  return (
    <div className="quick-actions">
      <button type="button" className="quick-chip quick-chip-dark" onClick={onOpenContact}>
        Anfrage
      </button>
      <a className="quick-chip" href="tel:+492102706362">
        Anrufen
      </a>
    </div>
  );
}

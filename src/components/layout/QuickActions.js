import React from 'react';

export default function QuickActions({ onOpenContact }) {
  return (
    <div className="quick-actions">
      <button type="button" className="quick-fab quick-fab-brand" onClick={onOpenContact} aria-label="Anfrage stellen" title="Anfrage stellen">
        <span aria-hidden="true">✉</span>
      </button>
      <a className="quick-fab" href="tel:+492102706362" aria-label="Anrufen" title="Anrufen">
        <span aria-hidden="true">☎</span>
      </a>
    </div>
  );
}

import React from 'react';

function ContactInquiryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="quick-fab-icon">
      <path d="M5.75 6.5h12.5A2.75 2.75 0 0 1 21 9.25v6.5a2.75 2.75 0 0 1-2.75 2.75H9.8l-3.78 2.78a.75.75 0 0 1-1.2-.6v-2.18A2.76 2.76 0 0 1 3 15.75v-6.5A2.75 2.75 0 0 1 5.75 6.5Z" fill="currentColor" opacity="0.18" />
      <path d="M8 11.25h8M8 14.25h5.25M15.6 4.75l.55 1.2 1.2.55-1.2.55-.55 1.2-.55-1.2-1.2-.55 1.2-.55.55-1.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.75 6.5h12.5A2.75 2.75 0 0 1 21 9.25v6.5a2.75 2.75 0 0 1-2.75 2.75H9.8l-3.78 2.78a.75.75 0 0 1-1.2-.6v-2.18A2.76 2.76 0 0 1 3 15.75v-6.5A2.75 2.75 0 0 1 5.75 6.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function QuickActions({ onOpenContact }) {
  return (
    <div className="quick-actions" aria-label="Schnellaktionen">
      <button
        type="button"
        className="quick-fab quick-fab-brand"
        onClick={onOpenContact}
        aria-label="Kontaktanfrage stellen"
        title="Kontaktanfrage stellen"
      >
        <ContactInquiryIcon />
      </button>
      <a
        className="quick-fab quick-fab-mobile"
        href="tel:+492102706362"
        aria-label="Anrufen"
        title="Anrufen"
      >
        <span aria-hidden="true">☎</span>
      </a>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';

const SERVICE_LABELS = {
  immobilienverwaltung: 'Immobilienverwaltung',
  dienstleistungen: 'Dienstleistungen',
  mietmaschinist: 'Mietmaschinist als Dienstleister',
  maschinenverleih: 'Maschinenverleih mit Maschinist',
};

const CATEGORY_META = {
  immobilienverwaltung: {
    eyebrow: 'Immobilienservice',
    title: 'Anfrage zur Immobilienverwaltung',
    description: 'Schildern Sie Ihr Anliegen kurz. Die Anfrage wird direkt an den Bereich Immobilienverwaltung gesendet.',
  },
  dienstleistungen: {
    eyebrow: 'Dienstleistungen',
    title: 'Anfrage zu Dienstleistungen',
    description: 'Wählen Sie zuerst die gewünschte Leistungsart und senden Sie dann Ihre Nachricht direkt an den Dienstleistungsbereich.',
  },
};

const initialForm = {
  email: '',
  message: '',
  consent: false,
  website: '',
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="contact-success-check">
      <circle cx="40" cy="40" r="36" fill="none" />
      <path d="M24 41.5 35.2 52.7 57 31" fill="none" />
    </svg>
  );
}

export default function ContactModal({ open, onClose, initialCategory = null, initialService = null }) {
  const [category, setCategory] = useState(initialCategory);
  const [serviceType, setServiceType] = useState(initialService);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [startedAt, setStartedAt] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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

  useEffect(() => {
    if (!open) return;
    setCategory(initialCategory);
    setServiceType(initialService);
    setFormData(initialForm);
    setErrors({});
    setStartedAt(Date.now());
    setIsSubmitting(false);
    setSubmitState('idle');
    setSubmitMessage('');
  }, [open, initialCategory, initialService]);

  const step = useMemo(() => {
    if (submitState === 'success') return 'success';
    if (!category) return 'category';
    if (category === 'dienstleistungen' && !serviceType) return 'service';
    return 'form';
  }, [category, serviceType, submitState]);

  const detailLabel = category === 'dienstleistungen' ? SERVICE_LABELS[serviceType] : SERVICE_LABELS[category];

  const setField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Bitte eine gültige E-Mail-Adresse eingeben.';
    }

    if (message.length < 10) {
      nextErrors.message = 'Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.';
    }

    if (!formData.consent) {
      nextErrors.consent = 'Bitte die Datenschutzerklärung bestätigen.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const type = category === 'immobilienverwaltung' ? 'Immobilienverwaltung' : 'Dienstleistungen';
      const service = category === 'dienstleistungen' ? detailLabel : '';

      const response = await fetch(`${process.env.PUBLIC_URL || ''}/api/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          message: formData.message.trim(),
          type,
          service,
          consent: formData.consent,
          website: formData.website,
          startedAt,
        }),
      });

      const payload = await response.json().catch(() => ({ ok: false, message: 'Antwort konnte nicht verarbeitet werden.' }));

      if (!response.ok || !payload.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
        }
        throw new Error(payload.message || 'Die Anfrage konnte nicht versendet werden.');
      }

      setSubmitState('success');
      setSubmitMessage(payload.message || 'Anfrage erfolgreich versendet.');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error.message || 'Die Anfrage konnte nicht versendet werden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop contact-flow-backdrop" onClick={onClose} role="presentation">
      <div
        className={`modal-panel contact-flow-modal step-${step}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="modal-head contact-flow-head">
          <div>
            <p className="eyebrow">Digitale Anfrage</p>
            <h2 id="contact-modal-title">Anfrage stellen</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Schließen">
            ×
          </button>
        </div>

        <div className="contact-progress" aria-hidden="true">
          <span className={!category ? 'is-active' : 'is-complete'} />
          <span className={category && (category !== 'dienstleistungen' || serviceType) ? 'is-active' : ''} />
          <span className={step === 'form' || step === 'success' ? 'is-active' : ''} />
        </div>

        {step === 'category' ? (
          <div className="contact-flow-stage">
            <p className="modal-copy">
              Wählen Sie zuerst aus, ob Ihre Anfrage die Immobilienverwaltung oder den Dienstleistungsbereich betrifft.
            </p>
            <div className="inquiry-choice-grid">
              <button type="button" className="inquiry-choice-card" onClick={() => setCategory('immobilienverwaltung')}>
                <span className="inquiry-choice-eyebrow">Immobilienservice</span>
                <strong>Immobilienverwaltung</strong>
                <p>Für Bestandsbetreuung, Verwaltungsfragen, Abstimmungen und laufende Anliegen rund um die Immobilie.</p>
              </button>
              <button type="button" className="inquiry-choice-card inquiry-choice-card-dark" onClick={() => setCategory('dienstleistungen')}>
                <span className="inquiry-choice-eyebrow">Dienstleistungen</span>
                <strong>Dienstleistungsanfrage</strong>
                <p>Für Einsätze vor Ort, Maschinenleistungen und praktische Ausführung rund um Fläche, Gelände und Zugang.</p>
              </button>
            </div>
          </div>
        ) : null}

        {step === 'service' ? (
          <div className="contact-flow-stage">
            <p className="modal-copy">
              Entscheiden Sie kurz, welche Art von Dienstleistungsanfrage Sie senden möchten.
            </p>
            <div className="inquiry-choice-grid inquiry-choice-grid-single">
              <button type="button" className="inquiry-choice-card inquiry-choice-card-dark" onClick={() => setServiceType('mietmaschinist')}>
                <span className="inquiry-choice-eyebrow">Dienstleister buchen</span>
                <strong>Mietmaschinist</strong>
                <p>Für Einsätze, bei denen ein Maschinist als Dienstleister benötigt wird.</p>
              </button>
              <button type="button" className="inquiry-choice-card" onClick={() => setServiceType('maschinenverleih')}>
                <span className="inquiry-choice-eyebrow">Maschineneinsatz</span>
                <strong>Maschinenverleih mit Maschinist</strong>
                <p>Für die Anfrage eines Maschinenverleihs inklusive passender Bedienung vor Ort.</p>
              </button>
            </div>
            <div className="form-actions inquiry-actions-left">
              <button type="button" className="button button-light" onClick={() => setCategory(null)}>
                Zurück
              </button>
            </div>
          </div>
        ) : null}

        {step === 'form' ? (
          <div className="contact-flow-stage">
            <div className="contact-flow-summary">
              <div>
                <p className="eyebrow">{CATEGORY_META[category]?.eyebrow}</p>
                <h3>{CATEGORY_META[category]?.title}</h3>
                <p>{CATEGORY_META[category]?.description}</p>
              </div>
              <div className="contact-flow-badge">{detailLabel}</div>
            </div>

            <form className="contact-form contact-form-modern" onSubmit={handleSubmit}>
              <label>
                <span>E-Mail-Adresse</span>
                <input
                  type="email"
                  name="email"
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={(event) => setField('email', event.target.value)}
                  required
                />
                {errors.email ? <small className="form-error">{errors.email}</small> : null}
              </label>

              <label>
                <span>Nachricht</span>
                <textarea
                  name="message"
                  rows="7"
                  placeholder="Beschreiben Sie kurz Ihr Anliegen, das Objekt oder den gewünschten Einsatz."
                  value={formData.message}
                  onChange={(event) => setField('message', event.target.value)}
                  required
                />
                {errors.message ? <small className="form-error">{errors.message}</small> : null}
              </label>

              <label className="checkbox-field sr-honeypot" aria-hidden="true">
                <span>Website</span>
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => setField('website', event.target.value)}
                />
              </label>

              <label className="checkbox-field consent-field">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(event) => setField('consent', event.target.checked)}
                />
                <span>Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Anfrage zu.</span>
              </label>
              {errors.consent ? <small className="form-error">{errors.consent}</small> : null}
              {submitState === 'error' && submitMessage ? <div className="form-submit-error">{submitMessage}</div> : null}

              <div className="form-actions">
                <button
                  type="button"
                  className="button button-light"
                  onClick={() => {
                    if (category === 'dienstleistungen' && serviceType) {
                      setServiceType(null);
                    } else {
                      setCategory(null);
                    }
                  }}
                >
                  Zurück
                </button>
                <button type="submit" className="button button-brand button-brand-strong" disabled={isSubmitting}>
                  {isSubmitting ? 'Wird gesendet…' : 'Anfrage senden'}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {step === 'success' ? (
          <div className="contact-success-state" role="status" aria-live="polite">
            <div className="contact-success-burst" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <CheckIcon />
            <p className="eyebrow">Erfolgreich versendet</p>
            <h3>Ihre Anfrage ist unterwegs.</h3>
            <p>
              {submitMessage || 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt und landet direkt im passenden Bereich.'}
            </p>
            <button type="button" className="button button-brand button-brand-strong" onClick={onClose}>
              Fenster schließen
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

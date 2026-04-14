import React, { useEffect, useMemo, useState } from 'react';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
  Alert,
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { PremiumButton } from './ui';

const SERVICE_LABELS = {
  immobilienverwaltung: 'Immobilienverwaltung',
  dienstleistungen: 'Dienstleistungen',
  mietmaschinist: 'Mietmaschinist als Dienstleister',
  maschinenverleih: 'Maschinenverleih mit Maschinist',
};

const CATEGORY_META = {
  immobilienverwaltung: {
    eyebrow: 'Immobilienverwaltung',
    title: 'Anfrage zur Immobilienverwaltung',
    description: 'Schildern Sie Ihr Anliegen kurz. Die Anfrage wird direkt an den Bereich Immobilienverwaltung gesendet.',
  },
  dienstleistungen: {
    eyebrow: 'Dienstleistungen',
    title: 'Anfrage zu Dienstleistungen',
    description: 'Wählen Sie zuerst die gewünschte Leistungsart und senden Sie dann Ihre Nachricht direkt an den Dienstleistungsbereich.',
  },
};

const initialForm = { email: '', message: '', consent: false, website: '' };

function ChoiceCard({ eyebrow, title, text, dark = false, icon, onClick }) {
  return (
    <button type="button" className={`inquiry-choice-card ${dark ? 'inquiry-choice-card-dark' : ''}`} onClick={onClick}>
      <span className="inquiry-choice-icon" aria-hidden="true">{icon}</span>
      <span className="inquiry-choice-eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </button>
  );
}

export default function ContactModal({ open, onClose, initialCategory = null, initialService = null }) {
  const { user, isAuthenticated } = useAuth();
  const [category, setCategory] = useState(initialCategory);
  const [serviceType, setServiceType] = useState(initialService);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [startedAt, setStartedAt] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    setCategory(initialCategory);
    setServiceType(initialService);
    setFormData({ ...initialForm, email: user?.email || '' });
    setErrors({});
    setStartedAt(Date.now());
    setIsSubmitting(false);
    setSubmitState('idle');
    setSubmitMessage('');
  }, [open, initialCategory, initialService, user]);

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
    if (!isAuthenticated && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) nextErrors.email = 'Bitte eine gültige E-Mail-Adresse eingeben.';
    if (message.length < 10) nextErrors.message = 'Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.';
    if (!formData.consent) nextErrors.consent = 'Bitte die Datenschutzerklärung bestätigen.';
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(localStorage.getItem('as_token') ? { Authorization: `Bearer ${localStorage.getItem('as_token')}` } : {}) },
        body: JSON.stringify({
          email: isAuthenticated ? '' : formData.email.trim(),
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
        if (payload.errors) setErrors(payload.errors);
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        className: `modal-panel contact-flow-modal step-${step}`,
        sx: {
          borderRadius: '30px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(249,246,240,0.94))',
          border: '1px solid rgba(35,39,43,0.08)',
          boxShadow: '0 38px 90px rgba(17,20,24,0.18)',
        },
      }}
      BackdropProps={{ className: 'modal-backdrop contact-flow-backdrop' }}
    >
      <DialogTitle className="modal-head contact-flow-head" id="contact-modal-title">
        <div className="contact-flow-head-inner">
          <div className="contact-progress" aria-hidden="true">
            <span className={step === 'category' ? 'is-active' : 'is-complete'} />
            <span className={step === 'service' ? 'is-active' : step === 'form' || step === 'success' ? 'is-complete' : ''} />
            <span className={step === 'form' || step === 'success' ? 'is-active' : ''} />
          </div>
          {isSubmitting ? <LinearProgress className="contact-submit-progress" sx={{ borderRadius: 999 }} /> : null}
          <div>
            <p className="eyebrow">Digitale Anfrage</p>
            <h2>Anfrage stellen</h2>
          </div>
        </div>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>

        {step === 'category' ? (
          <div className="contact-flow-stage">
            <p className="modal-copy">
              Wählen Sie zuerst aus, ob Ihre Anfrage die Immobilienverwaltung oder den Dienstleistungsbereich betrifft.
            </p>
            <div className="inquiry-choice-grid">
              <ChoiceCard
                eyebrow="Immobilienverwaltung"
                title="Immobilienverwaltung"
                text="Für Bestandsbetreuung, Verwaltungsfragen, Abstimmungen und laufende Anliegen rund um die Immobilie."
                icon={<ApartmentRoundedIcon />}
                onClick={() => setCategory('immobilienverwaltung')}
              />
              <ChoiceCard
                eyebrow="Dienstleistungen"
                title="Dienstleistungsanfrage"
                text="Für Einsätze vor Ort, Maschinenleistungen und praktische Ausführung rund um Fläche, Gelände und Zugang."
                icon={<ConstructionRoundedIcon />}
                dark
                onClick={() => setCategory('dienstleistungen')}
              />
            </div>
          </div>
        ) : null}

        {step === 'service' ? (
          <div className="contact-flow-stage">
            <p className="modal-copy">Entscheiden Sie kurz, welche Art von Dienstleistungsanfrage Sie senden möchten.</p>
            <div className="inquiry-choice-grid inquiry-choice-grid-single">
              <ChoiceCard
                eyebrow="Dienstleister buchen"
                title="Mietmaschinist"
                text="Für Einsätze, bei denen ein Maschinist als Dienstleister benötigt wird."
                icon={<BuildCircleRoundedIcon />}
                dark
                onClick={() => setServiceType('mietmaschinist')}
              />
              <ChoiceCard
                eyebrow="Maschineneinsatz"
                title="Maschinenverleih mit Maschinist"
                text="Für die Anfrage eines Maschinenverleihs inklusive passender Bedienung vor Ort."
                icon={<ConstructionRoundedIcon />}
                onClick={() => setServiceType('maschinenverleih')}
              />
            </div>
            <div className="form-actions inquiry-actions-left">
              <PremiumButton type="button" variant="outlined" startIcon={<KeyboardBackspaceRoundedIcon />} onClick={() => setCategory(null)}>
                Zurück
              </PremiumButton>
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

            <Box component="form" className="contact-form contact-form-modern" onSubmit={handleSubmit}>
              <Stack spacing={2.2}>
                {isAuthenticated ? (
                  <Alert severity="info">Sie sind angemeldet. Die Anfrage wird mit Ihrer hinterlegten E-Mail-Adresse {user?.email} gesendet.</Alert>
                ) : (
                  <TextField
                    type="email"
                    name="email"
                    label="E-Mail-Adresse"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(event) => setField('email', event.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email || ' '}
                    fullWidth
                  />
                )}
                <TextField
                  name="message"
                  label="Nachricht"
                  rows={3}
                  multiline
                  placeholder="Beschreiben Sie kurz Ihr Anliegen, das Objekt oder den gewünschten Einsatz."
                  value={formData.message}
                  onChange={(event) => setField('message', event.target.value)}
                  error={Boolean(errors.message)}
                  helperText={errors.message || ' '}
                  fullWidth
                />
                <TextField
                  type="text"
                  name="website"
                  label="Website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => setField('website', event.target.value)}
                  className="sr-honeypot"
                  sx={{ display: 'none' }}
                />
                <div className="consent-wrap">
                  <Box className="consent-field" onClick={() => setField('consent', !formData.consent)} role="checkbox" aria-checked={formData.consent} tabIndex={0} onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); setField('consent', !formData.consent); } }}>
                    <Checkbox
                      checked={formData.consent}
                      onChange={(event) => setField('consent', event.target.checked)}
                      onClick={(event) => event.stopPropagation()}
                      sx={{ p: '4px 8px 4px 0', alignSelf: 'flex-start' }}
                    />
                    <Typography component="span" className="consent-label">
                      Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Anfrage zu.
                    </Typography>
                  </Box>
                  {errors.consent ? <Typography className="form-error" component="small">{errors.consent}</Typography> : null}
                </div>
                {submitState === 'error' && submitMessage ? <Alert severity="error">{submitMessage}</Alert> : null}
                <div className="form-actions">
                  <PremiumButton
                    type="button"
                    variant="outlined"
                    startIcon={<KeyboardBackspaceRoundedIcon />}
                    onClick={() => {
                      if (category === 'dienstleistungen' && serviceType) setServiceType(null);
                      else setCategory(null);
                    }}
                  >
                    Zurück
                  </PremiumButton>
                  <PremiumButton type="submit" endIcon={<SendRoundedIcon />} disabled={isSubmitting}>
                    {isSubmitting ? 'Wird gesendet…' : 'Anfrage senden'}
                  </PremiumButton>
                </div>
              </Stack>
            </Box>
          </div>
        ) : null}

        {step === 'success' ? (
          <div className="contact-success-state" role="status" aria-live="polite">
            <div className="contact-success-burst" aria-hidden="true"><span /><span /><span /></div>
            <CheckCircleRoundedIcon className="contact-success-icon" />
            <p className="eyebrow">Erfolgreich versendet</p>
            <h3>Ihre Anfrage ist unterwegs.</h3>
            <p>{submitMessage || 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt und landet direkt im passenden Bereich.'}</p>
            <PremiumButton type="button" onClick={onClose}>Fenster schließen</PremiumButton>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

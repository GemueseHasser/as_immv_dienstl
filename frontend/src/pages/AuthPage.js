import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Tab, Tabs, TextField } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PremiumButton } from '../components/ui';
import { apiFetch } from '../api/client';
import { useAuth } from '../auth/AuthContext';

const initialForm = { name: '', email: '', password: '', passwordConfirm: '' };

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, forgotPassword, resetPassword, user, logout } = useAuth();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const verifyToken = searchParams.get('verify') || '';
  const resetToken = searchParams.get('reset') || '';
  const isResetMode = Boolean(resetToken);
  const isVerifyMode = Boolean(verifyToken);
  const destination = location.state?.from || '/immobilienverwaltung/wohnungen';
  const view = useMemo(() => {
    if (isVerifyMode) return 'verify';
    if (isResetMode) return 'reset';
    return tab === 2 ? 'forgot' : tab === 1 ? 'register' : 'login';
  }, [isResetMode, isVerifyMode, tab]);

  useEffect(() => {
    if (!isVerifyMode) return;
    let active = true;
    setVerifying(true);
    setError('');
    setSuccess('');

    apiFetch(`/auth/verify-email?token=${encodeURIComponent(verifyToken)}`)
      .then((payload) => {
        if (!active) return;
        setSuccess(payload.message || 'Ihre E-Mail-Adresse wurde bestätigt.');
        setSearchParams({}, { replace: true });
        setTab(0);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Die E-Mail-Bestätigung ist fehlgeschlagen.');
      })
      .finally(() => {
        if (active) setVerifying(false);
      });

    return () => {
      active = false;
    };
  }, [isVerifyMode, setSearchParams, verifyToken]);

  useEffect(() => {
    setError('');
    if (!isVerifyMode && !isResetMode) {
      setForm(initialForm);
    }
  }, [tab, isVerifyMode, isResetMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      if (view === 'login') {
        await login(form.email, form.password);
        navigate(destination, { replace: true });
      } else if (view === 'register') {
        if (form.password !== form.passwordConfirm) {
          throw new Error('Die beiden Passwörter stimmen nicht überein.');
        }
        const payload = await register(form.name, form.email, form.password);
        setSuccess(payload.message || 'Bitte bestätigen Sie Ihre E-Mail-Adresse.');
        setForm(initialForm);
        setTab(0);
      } else if (view === 'forgot') {
        const payload = await forgotPassword(form.email);
        setSuccess(payload.message || 'Falls die E-Mail existiert, wurde ein Link versendet.');
      } else if (view === 'reset') {
        if (form.password !== form.passwordConfirm) {
          throw new Error('Die beiden Passwörter stimmen nicht überein.');
        }
        const payload = await resetPassword(resetToken, form.password);
        setSuccess(payload.message || 'Ihr Passwort wurde geändert.');
        setForm(initialForm);
        setSearchParams({}, { replace: true });
        setTab(0);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const switchToStandardLogin = () => {
    setSearchParams({}, { replace: true });
    setTab(0);
    setError('');
  };

  return (
    <section className="section">
      <div className="container compact-shell auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Benutzerbereich</p>
          <h1>
            {view === 'verify'
              ? 'E-Mail bestätigen'
              : view === 'reset'
                ? 'Neues Passwort vergeben'
                : view === 'forgot'
                  ? 'Passwort vergessen'
                  : 'Anmelden oder registrieren'}
          </h1>
          <p>
            {view === 'verify'
              ? 'Wir prüfen Ihren Bestätigungslink.'
              : view === 'reset'
                ? 'Legen Sie hier ein neues Passwort für Ihr Benutzerkonto fest.'
                : view === 'forgot'
                  ? 'Geben Sie Ihre E-Mail-Adresse ein. Falls ein Konto existiert, erhalten Sie einen Link zum Zurücksetzen.'
                  : 'Angemeldete Nutzer können Nachrichten zu Wohnungsanzeigen verfassen.'}
          </p>

          {user && !isResetMode && !isVerifyMode ? (
            <div className="auth-logged-in">
              <Alert severity="success">Sie sind als {user.name} angemeldet.</Alert>
              <div className="wohnungen-cta-row">
                <PremiumButton onClick={() => navigate('/immobilienverwaltung/wohnungen')}>Zu den Wohnungen</PremiumButton>
                <PremiumButton variant="outlined" onClick={logout}>Abmelden</PremiumButton>
              </div>
            </div>
          ) : (
            <>
              {!isVerifyMode && !isResetMode ? (
                <Tabs value={Math.min(tab, 1)} onChange={(_event, value) => { setTab(value); setSuccess(''); }} sx={{ mb: 2 }}>
                  <Tab label="Anmelden" />
                  <Tab label="Registrieren" />
                </Tabs>
              ) : null}

              {verifying ? <Alert severity="info" sx={{ mb: 2 }}>Bestätigungslink wird geprüft...</Alert> : null}
              {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
              {success ? <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert> : null}

              {!isVerifyMode ? (
                <form className="auth-form" onSubmit={handleSubmit}>
                  {view === 'register' ? (
                    <>
                      <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required />
                      <TextField label="E-Mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required />
                      <TextField label="Passwort" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required />
                      <TextField
                        label="Passwort wiederholen"
                        type="password"
                        value={form.passwordConfirm}
                        onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
                        fullWidth
                        required
                      />
                    </>
                  ) : view === 'forgot' ? (
                    <TextField label="E-Mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required />
                  ) : view === 'reset' ? (
                    <>
                      <TextField label="Neues Passwort" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required />
                      <TextField
                        label="Neues Passwort wiederholen"
                        type="password"
                        value={form.passwordConfirm}
                        onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
                        fullWidth
                        required
                      />
                    </>
                  ) : (
                    <>
                      <TextField label="E-Mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required />
                      <TextField label="Passwort" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required />
                    </>
                  )}

                  <PremiumButton type="submit" disabled={submitting}>
                    {view === 'login'
                      ? 'Anmelden'
                      : view === 'register'
                        ? 'Konto erstellen'
                        : view === 'forgot'
                          ? 'Link senden'
                          : 'Passwort speichern'}
                  </PremiumButton>
                </form>
              ) : null}

              <div className="auth-helper-actions">
                {!isVerifyMode && !isResetMode && view !== 'forgot' ? (
                  <button type="button" className="auth-helper-link" onClick={() => { setTab(2); setSuccess(''); setError(''); }}>
                    Passwort vergessen?
                  </button>
                ) : null}
                {(view === 'forgot' || isResetMode || isVerifyMode) ? (
                  <button type="button" className="auth-helper-link" onClick={switchToStandardLogin}>
                    Zurück zum Login
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

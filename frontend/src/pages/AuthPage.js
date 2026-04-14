import React, { useState } from 'react';
import { Alert, Tab, Tabs, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { PremiumButton } from '../components/ui';
import { useAuth } from '../auth/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user, logout } = useAuth();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const destination = location.state?.from || '/immobilienverwaltung/wohnungen';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (tab === 0) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <div className="container compact-shell auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Benutzerbereich</p>
          <h1>Anmelden oder registrieren</h1>
          <p>Angemeldete Nutzer können Nachrichten zu Wohnungsanzeigen verfassen. Admins verwalten zusätzlich alle Inserate.</p>
          {user ? (
            <div className="auth-logged-in">
              <Alert severity="success">Sie sind als {user.name} angemeldet.</Alert>
              <div className="wohnungen-cta-row">
                <PremiumButton onClick={() => navigate('/immobilienverwaltung/wohnungen')}>Zu den Wohnungen</PremiumButton>
                <PremiumButton variant="outlined" onClick={logout}>Abmelden</PremiumButton>
              </div>
            </div>
          ) : (
            <>
              <Tabs value={tab} onChange={(_event, value) => setTab(value)} sx={{ mb: 2 }}>
                <Tab label="Anmelden" />
                <Tab label="Registrieren" />
              </Tabs>
              {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
              <form className="auth-form" onSubmit={handleSubmit}>
                {tab === 1 ? (
                  <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
                ) : null}
                <TextField label="E-Mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
                <TextField label="Passwort" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />
                <PremiumButton type="submit">{tab === 0 ? 'Anmelden' : 'Konto erstellen'}</PremiumButton>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

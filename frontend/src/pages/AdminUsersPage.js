import React, { useEffect, useMemo, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { apiFetch } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PremiumButton } from '../components/ui';

const emptyForm = { id: null, name: '', email: '', role: 'user', password: '' };

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(form.id);
  const editorTitle = useMemo(() => (isEditing ? 'Benutzer bearbeiten' : 'Neuen Benutzer anlegen'), [isEditing]);

  const loadUsers = async () => {
    try {
      const payload = await apiFetch('/admin/users');
      setUsers(payload.users || []);
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetEditor = () => {
    setForm(emptyForm);
    setFormError('');
    setEditorOpen(false);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setFormError('');
    setEditorOpen(true);
  };

  const openEdit = (entry) => {
    setForm({
      id: entry.id,
      name: entry.name || '',
      email: entry.email || '',
      role: entry.role || 'user',
      password: '',
    });
    setFormError('');
    setEditorOpen(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        password: form.password.trim() || null,
      };
      if (!isEditing && !payload.password.trim()) {
        throw new Error('Für neue Benutzer ist ein Passwort erforderlich.');
      }
      await apiFetch(isEditing ? `/admin/users/${form.id}` : '/admin/users', {
        method: isEditing ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      await loadUsers();
      setStatus({
        error: '',
        success: isEditing ? 'Benutzer wurde aktualisiert.' : 'Benutzer wurde angelegt.',
      });
      resetEditor();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      setDeleteTarget(null);
      await loadUsers();
      setStatus({ error: '', success: 'Benutzer wurde gelöscht.' });
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="admin-card">
          <div className="admin-row-head">
            <div>
              <p className="eyebrow">Admin</p>
              <h1>Benutzerverwaltung</h1>
              <p>Hier können Sie Benutzer anlegen, bearbeiten, Rollen festlegen und bei Bedarf löschen.</p>
            </div>
            <PremiumButton startIcon={<PersonAddAlt1RoundedIcon />} onClick={openCreate}>
              Benutzer anlegen
            </PremiumButton>
          </div>
          {status.error ? <Alert severity="error" sx={{ mt: 2 }}>{status.error}</Alert> : null}
          {status.success ? <Alert severity="success" sx={{ mt: 2 }}>{status.success}</Alert> : null}
        </div>
        <div className="admin-user-list">
          {users.map((entry) => (
            <article key={entry.id} className="admin-user-item">
              <div>
                <strong>{entry.name}</strong>
                <p>{entry.email}</p>
                <p>Rolle: {entry.role}</p>
              </div>
              <div className="wohnungen-cta-row">
                <PremiumButton variant="outlined" startIcon={<EditRoundedIcon />} onClick={() => openEdit(entry)}>
                  Bearbeiten
                </PremiumButton>
                {user?.id === entry.id ? (
                  <PremiumButton variant="outlined" disabled>Aktueller Admin</PremiumButton>
                ) : (
                  <PremiumButton variant="outlined" startIcon={<DeleteRoundedIcon />} onClick={() => setDeleteTarget(entry)}>
                    Löschen
                  </PremiumButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={editorOpen} onClose={resetEditor} fullWidth maxWidth="sm">
        <DialogTitle>{editorTitle}</DialogTitle>
        <DialogContent>
          <form className="auth-form" onSubmit={handleSave} id="admin-user-form">
            <DialogContentText sx={{ mb: 2 }}>
              {isEditing
                ? 'Name, E-Mail, Rolle und optional das Passwort können hier angepasst werden.'
                : 'Legen Sie hier einen neuen Benutzer an und vergeben Sie direkt die gewünschte Rolle.'}
            </DialogContentText>
            {formError ? <Alert severity="error">{formError}</Alert> : null}
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="E-Mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              select
              label="Rolle"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              fullWidth
              required
            >
              <MenuItem value="user">Benutzer</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
            </TextField>
            <TextField
              label={isEditing ? 'Neues Passwort (optional)' : 'Passwort'}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              fullWidth
              required={!isEditing}
              helperText={isEditing ? 'Leer lassen, um das bisherige Passwort beizubehalten.' : 'Mindestens 6 Zeichen.'}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={resetEditor}>Abbrechen</PremiumButton>
          <PremiumButton type="submit" form="admin-user-form" disabled={saving}>
            {isEditing ? 'Speichern' : 'Benutzer anlegen'}
          </PremiumButton>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Benutzer löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget ? `Möchten Sie den Benutzer „${deleteTarget.name}“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={() => setDeleteTarget(null)}>Abbrechen</PremiumButton>
          <PremiumButton onClick={handleDelete}>Löschen</PremiumButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}

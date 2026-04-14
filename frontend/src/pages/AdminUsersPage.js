import React, { useEffect, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { apiFetch } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PremiumButton } from '../components/ui';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);

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
          <p className="eyebrow">Admin</p>
          <h1>Benutzerverwaltung</h1>
          <p>Hier sehen Sie alle registrierten Benutzer und können diese bei Bedarf löschen.</p>
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

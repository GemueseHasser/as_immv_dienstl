import React, { useEffect, useMemo, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiFetch, assetUrl } from '../api/client';
import RichTextEditor from '../components/RichTextEditor';
import { PremiumButton } from '../components/ui';

const initialForm = {
  id: null,
  title: '',
  shortDescription: '',
  fullDescription: '',
  exchangeUrl: '',
  titleImage: '',
  isPublished: true,
  images: [],
};

function ApartmentPreviewCard({ apartment, onEdit, onDelete }) {
  return (
    <article className="admin-apartment-preview">
      <img className="admin-apartment-preview-image" src={assetUrl(apartment.titleImage)} alt={apartment.title} />
      <div className="admin-apartment-preview-body">
        <div>
          <h3>{apartment.title}</h3>
          <p>{apartment.shortDescription}</p>
        </div>
        <div className="wohnungen-cta-row">
          <PremiumButton type="button" variant="outlined" startIcon={<EditRoundedIcon />} onClick={onEdit}>Bearbeiten</PremiumButton>
          <PremiumButton type="button" variant="outlined" startIcon={<DeleteRoundedIcon />} onClick={onDelete}>Löschen</PremiumButton>
        </div>
      </div>
    </article>
  );
}

function ApartmentForm({ editing, form, setForm, uploading, onUpload, onRemoveImage, onSubmit, onCancel }) {
  return (
    <div className="admin-card stack-gap">
      <div className="admin-row-head">
        <div>
          <p className="eyebrow">{editing ? 'Bearbeiten' : 'Neu anlegen'}</p>
          <h2>{editing ? 'Anzeige bearbeiten' : 'Neue Anzeige erstellen'}</h2>
        </div>
        <PremiumButton type="button" variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onCancel}>
          Zur Übersicht
        </PremiumButton>
      </div>
      <form className="admin-form" onSubmit={onSubmit}>
        <TextField label="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth required />
        <TextField label="Subtitel / Kurzbeschreibung" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} multiline minRows={3} fullWidth required />
        <div className="stack-gap stack-gap-tight">
          <div>
            <p className="eyebrow">Beschreibung</p>
            <h3 style={{ marginBottom: 12 }}>Ausführliche Beschreibung</h3>
            <RichTextEditor value={form.fullDescription} onChange={(html) => setForm({ ...form, fullDescription: html })} />
          </div>
        </div>
        <TextField label="Link zur Immobilienbörse" value={form.exchangeUrl} onChange={(e) => setForm({ ...form, exchangeUrl: e.target.value })} fullWidth />
        <div className="wohnungen-cta-row">
          <PremiumButton component="label" variant="outlined" startIcon={<UploadRoundedIcon />} disabled={uploading}>
            Bilder hochladen
            <input type="file" accept="image/*" hidden multiple onChange={onUpload} />
          </PremiumButton>
          <PremiumButton type="submit">{editing ? 'Änderungen speichern' : 'Anzeige anlegen'}</PremiumButton>
        </div>

        {form.images.length ? (
          <div className="admin-image-grid admin-image-grid-fixed">
            {form.images.map((imageUrl, index) => (
              <article key={`${imageUrl}-${index}`} className={`admin-image-card ${form.titleImage === imageUrl ? 'is-title' : ''}`}>
                <img src={assetUrl(imageUrl)} alt={`Upload ${index + 1}`} />
                <div className="admin-image-actions">
                  <PremiumButton
                    variant={form.titleImage === imageUrl ? 'contained' : 'outlined'}
                    startIcon={<StarRoundedIcon />}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, titleImage: imageUrl }))}
                  >
                    {form.titleImage === imageUrl ? 'Titelbild' : 'Als Titelbild setzen'}
                  </PremiumButton>
                  <PremiumButton type="button" variant="outlined" onClick={() => onRemoveImage(imageUrl)}>Entfernen</PremiumButton>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="wohnungen-empty">Noch keine Bilder hochgeladen.</div>
        )}
      </form>
    </div>
  );
}

export default function AdminWohnungenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const mode = useMemo(() => {
    if (location.pathname.endsWith('/neu')) return 'create';
    if (id) return 'edit';
    return 'list';
  }, [id, location.pathname]);

  const editing = mode === 'edit';
  const isFormMode = mode === 'create' || mode === 'edit';

  const loadApartments = async () => {
    try {
      const payload = await apiFetch('/apartments?includeDrafts=1');
      setApartments(payload.apartments || []);
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  const loadApartmentIntoForm = async (apartmentId) => {
    try {
      const payload = await apiFetch(`/admin/apartments/${apartmentId}`);
      setForm({
        id: payload.apartment.id,
        title: payload.apartment.title,
        shortDescription: payload.apartment.shortDescription,
        fullDescription: payload.apartment.fullDescription || '',
        exchangeUrl: payload.apartment.exchangeUrl || '',
        titleImage: payload.apartment.titleImage,
        isPublished: true,
        images: payload.apartment.images.map((item) => item.imageUrl),
      });
      setStatus((current) => ({ ...current, error: '' }));
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  useEffect(() => {
    loadApartments();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && id) {
      loadApartmentIntoForm(id);
      return;
    }
    setForm(initialForm);
  }, [mode, id]);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setStatus({ error: '', success: '' });
    try {
      const body = new FormData();
      files.forEach((file) => body.append('images', file));
      const payload = await apiFetch('/admin/upload', { method: 'POST', body });
      const urls = payload.files.map((item) => item.url);
      setForm((current) => {
        const images = [...current.images, ...urls];
        return {
          ...current,
          titleImage: current.titleImage || urls[0] || '',
          images,
        };
      });
      setStatus({ error: '', success: 'Bilder wurden hochgeladen.' });
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/admin/apartments/${deleteTarget.id}`, { method: 'DELETE' });
      if (form.id === deleteTarget.id) {
        setForm(initialForm);
      }
      setDeleteTarget(null);
      await loadApartments();
      navigate('/admin/wohnungen');
      setStatus({ error: '', success: 'Anzeige wurde gelöscht.' });
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  const handleImageRemove = (imageToRemove) => {
    setForm((current) => {
      const images = current.images.filter((imageUrl) => imageUrl !== imageToRemove);
      return {
        ...current,
        images,
        titleImage: current.titleImage === imageToRemove ? (images[0] || '') : current.titleImage,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ error: '', success: '' });
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/admin/apartments/${form.id}` : '/admin/apartments';
      await apiFetch(url, {
        method,
        body: JSON.stringify({
          ...form,
          isPublished: true,
        }),
      });
      await loadApartments();
      setStatus({ error: '', success: editing ? 'Anzeige aktualisiert.' : 'Anzeige erstellt.' });
      setForm(initialForm);
      navigate('/admin/wohnungen', { replace: true });
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="admin-card">
          <p className="eyebrow">Admin</p>
          <h1>Wohnungsanzeigen</h1>
          <p>
            In der Übersicht werden alle bestehenden Inserate angezeigt. Neue Anzeigen und Bearbeitungen öffnen sich jeweils in einem eigenen Bereich.
          </p>
        </div>

        {status.error ? <Alert severity="error">{status.error}</Alert> : null}
        {status.success ? <Alert severity="success">{status.success}</Alert> : null}

        {isFormMode ? (
          <ApartmentForm
            editing={editing}
            form={form}
            setForm={setForm}
            uploading={uploading}
            onUpload={handleFileUpload}
            onRemoveImage={handleImageRemove}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/wohnungen')}
          />
        ) : (
          <div className="admin-card stack-gap">
            <div className="admin-row-head">
              <div>
                <p className="eyebrow">Bestehende Anzeigen</p>
                <h2>Inserate</h2>
              </div>
              <PremiumButton type="button" startIcon={<AddRoundedIcon />} onClick={() => navigate('/admin/wohnungen/neu')}>
                Neue Anzeige anlegen
              </PremiumButton>
            </div>
            <div className="admin-apartment-list admin-apartment-list-clean">
              {apartments.length ? apartments.map((apartment) => (
                <ApartmentPreviewCard
                  key={apartment.id}
                  apartment={apartment}
                  onEdit={() => navigate(`/admin/wohnungen/${apartment.id}`)}
                  onDelete={() => setDeleteTarget(apartment)}
                />
              )) : <div className="wohnungen-empty">Noch keine Wohnungsanzeigen vorhanden.</div>}
            </div>
          </div>
        )}
      </div>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Anzeige löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget ? `Möchten Sie die Anzeige „${deleteTarget.title}“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={() => setDeleteTarget(null)}>Abbrechen</PremiumButton>
          <PremiumButton onClick={confirmDelete}>Löschen</PremiumButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}

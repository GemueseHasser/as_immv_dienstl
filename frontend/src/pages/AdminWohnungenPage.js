import React, { useEffect, useMemo, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Alert, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, assetUrl } from '../api/client';
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

export default function AdminWohnungenPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [uploading, setUploading] = useState(false);

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
        isPublished: payload.apartment.isPublished,
        images: payload.apartment.images.map((item) => item.imageUrl),
      });
      setStatus({ error: '', success: 'Anzeige geladen.' });
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    }
  };

  useEffect(() => {
    loadApartments();
  }, []);

  useEffect(() => {
    if (id) {
      loadApartmentIntoForm(id);
    } else {
      setForm(initialForm);
    }
  }, [id]);

  const editing = useMemo(() => Boolean(form.id), [form.id]);

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

  const handleDelete = async (apartmentId) => {
    try {
      await apiFetch(`/admin/apartments/${apartmentId}`, { method: 'DELETE' });
      if (form.id === apartmentId) {
        setForm(initialForm);
        navigate('/admin/wohnungen');
      }
      await loadApartments();
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
      const payload = await apiFetch(url, { method, body: JSON.stringify(form) });
      await loadApartments();
      setStatus({ error: '', success: editing ? 'Anzeige aktualisiert.' : 'Anzeige erstellt.' });
      navigate(`/admin/wohnungen/${payload.apartment.id}`, { replace: true });
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
          <p>Erstellen Sie neue Anzeigen oder bearbeiten Sie bestehende Inserate. Titelbild, Beschreibung, Galerie und Veröffentlichungsstatus werden hier gepflegt.</p>
        </div>

        <div className="admin-card stack-gap">
          <div className="admin-row-head">
            <div>
              <p className="eyebrow">Bearbeiten</p>
              <h2>{editing ? 'Anzeige bearbeiten' : 'Neue Anzeige erstellen'}</h2>
            </div>
            <PremiumButton type="button" variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => navigate('/admin/wohnungen')}>
              Neue Anzeige
            </PremiumButton>
          </div>
          {status.error ? <Alert severity="error">{status.error}</Alert> : null}
          {status.success ? <Alert severity="success">{status.success}</Alert> : null}
          <form className="admin-form" onSubmit={handleSubmit}>
            <TextField label="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
            <TextField label="Subtitel / Kurzbeschreibung" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} multiline minRows={3} fullWidth />
            <TextField label="Ausführliche Beschreibung" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} multiline minRows={5} fullWidth />
            <TextField label="Link zur Immobilienbörse" value={form.exchangeUrl} onChange={(e) => setForm({ ...form, exchangeUrl: e.target.value })} fullWidth />
            <FormControlLabel
              control={<Checkbox checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />}
              label="Anzeige veröffentlichen"
            />
            <div className="wohnungen-cta-row">
              <PremiumButton component="label" variant="outlined" startIcon={<UploadRoundedIcon />} disabled={uploading}>
                Bilder hochladen
                <input type="file" accept="image/*" hidden multiple onChange={handleFileUpload} />
              </PremiumButton>
              <PremiumButton type="submit">{editing ? 'Änderungen speichern' : 'Anzeige anlegen'}</PremiumButton>
            </div>

            {form.images.length ? (
              <div className="admin-image-grid">
                {form.images.map((imageUrl, index) => (
                  <article key={`${imageUrl}-${index}`} className={`admin-image-card ${form.titleImage === imageUrl ? 'is-title' : ''}`}>
                    <img src={assetUrl(imageUrl)} alt={`Upload ${index + 1}`} />
                    <div className="admin-image-actions">
                      <PremiumButton
                        variant={form.titleImage === imageUrl ? 'contained' : 'outlined'}
                        startIcon={<StarRoundedIcon />}
                        type="button" onClick={() => setForm((current) => ({ ...current, titleImage: imageUrl }))}
                      >
                        {form.titleImage === imageUrl ? 'Titelbild' : 'Als Titelbild setzen'}
                      </PremiumButton>
                      <PremiumButton type="button" variant="outlined" onClick={() => handleImageRemove(imageUrl)}>Entfernen</PremiumButton>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="wohnungen-empty">Noch keine Bilder hochgeladen.</div>
            )}
          </form>
        </div>

        <div className="admin-card stack-gap">
          <div className="admin-row-head">
            <div>
              <p className="eyebrow">Bestehende Anzeigen</p>
              <h2>Inserate</h2>
            </div>
          </div>
          <div className="admin-apartment-list admin-apartment-list-clean">
            {apartments.map((apartment) => (
              <ApartmentPreviewCard
                key={apartment.id}
                apartment={apartment}
                onEdit={() => navigate(`/admin/wohnungen/${apartment.id}`)}
                onDelete={() => handleDelete(apartment.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

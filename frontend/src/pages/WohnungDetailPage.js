import React, { useEffect, useMemo, useState } from 'react';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Alert, CircularProgress, Stack, TextField } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiFetch, assetUrl } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PremiumButton } from '../components/ui';

export default function WohnungDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    apiFetch(`/apartments/${slug}`)
      .then((payload) => {
        const apartmentPayload = payload.apartment;
        setApartment(apartmentPayload);
        const gallery = [apartmentPayload.titleImage, ...(apartmentPayload.images || []).map((image) => image.imageUrl)]
          .filter(Boolean)
          .filter((image, index, array) => array.indexOf(image) === index);
        setActiveImage(gallery[0] || '');
      })
      .catch((err) => setFeedback({ error: err.message, success: '' }))
      .finally(() => setLoading(false));
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!apartment) return [];
    return [apartment.titleImage, ...(apartment.images || []).map((image) => image.imageUrl)]
      .filter(Boolean)
      .filter((image, index, array) => array.indexOf(image) === index);
  }, [apartment]);

  const handleMessage = async (event) => {
    event.preventDefault();
    setFeedback({ error: '', success: '' });
    try {
      await apiFetch(`/apartments/${apartment.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      setMessage('');
      setFeedback({ error: '', success: 'Nachricht erfolgreich versendet.' });
    } catch (err) {
      setFeedback({ error: err.message, success: '' });
    }
  };

  if (loading) {
    return <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress /></Stack>;
  }

  if (!apartment) {
    return <section className="section"><div className="container compact-shell"><Alert severity="error">{feedback.error || 'Wohnung nicht gefunden.'}</Alert></div></section>;
  }

  return (
    <section className="section">
      <div className="container compact-shell wohnung-detail-layout">
        <div className="wohnung-detail-copy stack-gap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Wohnungsanzeige</p>
              <h1>{apartment.title}</h1>
            </div>
          </div>
          <p className="lead">{apartment.shortDescription}</p>
          <p>{apartment.fullDescription || apartment.shortDescription}</p>
          <div className="wohnungen-cta-row">
            {apartment.exchangeUrl ? (
              <PremiumButton component="a" href={apartment.exchangeUrl} target="_blank" rel="noreferrer" endIcon={<OpenInNewRoundedIcon />}>
                Externes Exposé öffnen
              </PremiumButton>
            ) : null}
            {isAdmin ? <PremiumButton component={RouterLink} to={`/admin/wohnungen/${apartment.id}`} variant="outlined">Anzeige verwalten</PremiumButton> : null}
          </div>
          {feedback.error ? <Alert severity="error">{feedback.error}</Alert> : null}
          {feedback.success ? <Alert severity="success">{feedback.success}</Alert> : null}

          <div className="wohnung-messages-card">
            <div className="section-head">
              <div>
                <p className="eyebrow">Nachricht senden</p>
                <h2>Kontakt zur Anzeige</h2>
              </div>
            </div>
            {isAuthenticated ? (
              <>
                <p>Ihre Nachricht wird direkt an die hinterlegte Immobilienverwaltungs-Adresse gesendet und der Wohnung eindeutig zugeordnet.</p>
                <form className="wohnung-message-form" onSubmit={handleMessage}>
                  <TextField
                    multiline
                    minRows={4}
                    label="Nachricht verfassen"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    fullWidth
                  />
                  <PremiumButton type="submit">Nachricht senden</PremiumButton>
                </form>
              </>
            ) : (
              <Alert severity="info" action={<PremiumButton size="small" onClick={() => navigate('/anmelden', { state: { from: location.pathname } })}>Anmelden</PremiumButton>}>
                Bitte melden Sie sich an, um eine Nachricht zu dieser Wohnung zu senden.
              </Alert>
            )}
          </div>
        </div>
        <aside className="wohnung-gallery-card">
          <img className="wohnung-hero-image" src={assetUrl(activeImage || apartment.titleImage)} alt={apartment.title} />
          {galleryImages.length > 1 ? (
            <div className="wohnung-gallery-grid">
              {galleryImages.map((imageUrl, index) => (
                <button
                  type="button"
                  key={`${imageUrl}-${index}`}
                  className={`wohnung-gallery-thumb ${imageUrl === (activeImage || apartment.titleImage) ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(imageUrl)}
                  aria-label={`Bild ${index + 1} groß anzeigen`}
                >
                  <img src={assetUrl(imageUrl)} alt={`${apartment.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

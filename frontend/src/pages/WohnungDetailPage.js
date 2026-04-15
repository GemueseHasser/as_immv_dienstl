import React, { useEffect, useMemo, useState } from 'react';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiFetch, assetUrl } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PremiumButton } from '../components/ui';

export default function WohnungDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [contactOpen, setContactOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    apiFetch(`/apartments/${slug}`)
      .then((payload) => {
        setApartment(payload.apartment);
        setSlideIndex(0);
      })
      .catch((err) => setFeedback({ error: err.message, success: '' }))
      .finally(() => setLoading(false));
  }, [slug]);

  const slideshowImages = useMemo(() => {
    if (!apartment) return [];
    return (apartment.images || [])
      .map((image) => image.imageUrl)
      .filter((imageUrl) => imageUrl && imageUrl !== apartment.titleImage)
      .filter((image, index, array) => array.indexOf(image) === index);
  }, [apartment]);

  const activeSlide = slideshowImages[slideIndex] || '';

  const handleMessage = async (event) => {
    event.preventDefault();
    setFeedback({ error: '', success: '' });
    try {
      const payload = await apiFetch(`/apartments/${apartment.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      setMessage('');
      setContactOpen(false);
      if (payload.conversationId) {
        navigate(`/konto/nachrichten/${payload.conversationId}`);
        return;
      }
      setFeedback({ error: '', success: 'Nachricht erfolgreich versendet.' });
    } catch (err) {
      setFeedback({ error: err.message, success: '' });
    }
  };

  const showPreviousSlide = () => {
    setSlideIndex((current) => (current - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const showNextSlide = () => {
    setSlideIndex((current) => (current + 1) % slideshowImages.length);
  };

  if (loading) {
    return <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress /></Stack>;
  }

  if (!apartment) {
    return <section className="section"><div className="container compact-shell"><Alert severity="error">{feedback.error || 'Wohnung nicht gefunden.'}</Alert></div></section>;
  }

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="wohnung-detail-hero-shell">
          <div className="wohnung-detail-top">
            <div className="wohnung-detail-top-image-stage">
              <img className="wohnung-detail-title-image" src={assetUrl(apartment.titleImage)} alt={apartment.title} />
            </div>
            <div className="wohnung-detail-top-copy">
              <div className="wohnung-detail-top-copy-inner">
                <h1>{apartment.title}</h1>
                <p className="lead">{apartment.shortDescription}</p>
                {feedback.error ? <Alert severity="error">{feedback.error}</Alert> : null}
                {feedback.success ? <Alert severity="success">{feedback.success}</Alert> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="wohnung-detail-content-grid">
          <div className="wohnung-detail-description-column stack-gap">
            <div className="wohnung-detail-action-row">
              {apartment.exchangeUrl ? (
                <PremiumButton component="a" href={apartment.exchangeUrl} target="_blank" rel="noreferrer" endIcon={<OpenInNewRoundedIcon />}>
                  Externes Exposé öffnen
                </PremiumButton>
              ) : null}
              {isAuthenticated ? (
                <PremiumButton variant="outlined" onClick={() => setContactOpen(true)}>Anfrage senden</PremiumButton>
              ) : (
                <PremiumButton variant="outlined" onClick={() => navigate('/anmelden', { state: { from: location.pathname } })}>Anfrage senden</PremiumButton>
              )}
            </div>
            <div className="wohnung-detail-description-card">
              <div
                className="rich-content-display"
                dangerouslySetInnerHTML={{ __html: apartment.fullDescription || `<p>${apartment.shortDescription}</p>` }}
              />
            </div>
          </div>

          <aside className="wohnung-slideshow-card">
            {activeSlide ? (
              <>
                <div className="wohnung-slideshow-stage">
                  <button type="button" className="wohnung-slide-nav wohnung-slide-nav-left" onClick={showPreviousSlide} aria-label="Vorheriges Bild">
                    <NavigateBeforeRoundedIcon />
                  </button>
                  <img className="wohnung-slideshow-image" src={assetUrl(activeSlide)} alt={`${apartment.title} Zusatzbild`} />
                  <button type="button" className="wohnung-slide-nav wohnung-slide-nav-right" onClick={showNextSlide} aria-label="Nächstes Bild">
                    <NavigateNextRoundedIcon />
                  </button>
                </div>
                <div className="wohnung-slideshow-thumbs">
                  {slideshowImages.map((imageUrl, index) => (
                    <button
                      key={`${imageUrl}-${index}`}
                      type="button"
                      className={`wohnung-gallery-thumb ${imageUrl === activeSlide ? 'is-active' : ''}`}
                      onClick={() => setSlideIndex(index)}
                    >
                      <img src={assetUrl(imageUrl)} alt={`${apartment.title} Vorschau ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="wohnungen-empty">Zu dieser Anzeige wurden keine weiteren Bilder hinterlegt.</div>
            )}
          </aside>
        </div>
      </div>

      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Anfrage senden</DialogTitle>
        <DialogContent>
          <form className="wohnung-message-form" onSubmit={handleMessage} id="apartment-message-form">
            <TextField
              multiline
              minRows={6}
              label="Nachricht verfassen"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              fullWidth
              required
              sx={{ mt: 1 }}
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <PremiumButton variant="outlined" onClick={() => setContactOpen(false)}>Abbrechen</PremiumButton>
          <PremiumButton type="submit" form="apartment-message-form">Anfrage senden</PremiumButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}

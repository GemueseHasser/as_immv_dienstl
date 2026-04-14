import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Stack } from '@mui/material';
import PageHero from '../components/PageHero';
import WohnungCard from '../components/wohnungen/WohnungCard';
import { apiFetch } from '../api/client';

export default function WohnungenPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    apiFetch('/apartments')
      .then((payload) => setApartments(payload.apartments || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        title="Wohnungsangebote"
        text="Hier finden Sie alle aktuell verfügbaren Wohnungsangebote von AS Immobilienverwaltung."
        logoType="immobilien"
      />
      <section className="section">
        <div className="container compact-shell stack-gap">
          {loading ? (
            <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
          ) : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          {!loading && !error ? (
            apartments.length ? (
              <div className="wohnungen-grid">
                {apartments.map((apartment) => <WohnungCard key={apartment.id} apartment={apartment} />)}
              </div>
            ) : (
              <div className="wohnungen-empty">Zurzeit sind keine Wohnungen veröffentlicht.</div>
            )
          ) : null}
        </div>
      </section>
    </>
  );
}

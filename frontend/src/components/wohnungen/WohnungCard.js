import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import { PremiumButton } from '../ui';
import { assetUrl } from '../../api/client';

export default function WohnungCard({ apartment }) {
  return (
    <article className="wohnung-card">
      <img className="wohnung-card-image" src={assetUrl(apartment.titleImage)} alt={apartment.title} />
      <div className="wohnung-card-body">
        <h3>{apartment.title}</h3>
        <p>{apartment.shortDescription}</p>
        <PremiumButton component={RouterLink} to={`/immobilienverwaltung/wohnungen/${apartment.slug}`} endIcon={<ArrowForwardRoundedIcon />}>
          Anzeige öffnen
        </PremiumButton>
      </div>
    </article>
  );
}

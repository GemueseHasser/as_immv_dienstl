import React from 'react';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { Paper } from '@mui/material';
import MobileSnapCarousel from './MobileSnapCarousel';
import { AccentChip } from './ui';

export default function ServicesGallery({ items }) {
  return (
    <MobileSnapCarousel className="services-gallery services-gallery-mosaic">
      {items.map((item, index) => (
        <Paper
          component="article"
          elevation={0}
          key={`${item.title}-${index}`}
          className={`gallery-card gallery-card-${index + 1} ${item.size ? `gallery-card-${item.size}` : ''}`}
        >
          <div className="gallery-media-wrap">
            <img src={item.image} alt={item.alt || item.title} />
          </div>
          <div className="gallery-copy">
            <AccentChip className="gallery-chip" icon={<CollectionsRoundedIcon />} label={item.category} size="small" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </Paper>
      ))}
    </MobileSnapCarousel>
  );
}

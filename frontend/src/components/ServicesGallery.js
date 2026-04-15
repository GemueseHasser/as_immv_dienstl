import React from 'react';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { Paper } from '@mui/material';
import MobileSnapCarousel from './MobileSnapCarousel';
import { AccentChip } from './ui';

function GalleryCard({ item, index, extraClass = '' }) {
  return (
    <Paper
      component="article"
      elevation={0}
      className={`gallery-card gallery-card-${index + 1} ${item.size ? `gallery-card-${item.size}` : ''} ${extraClass}`.trim()}
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
  );
}

export default function ServicesGallery({ items }) {
  const rows = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  return (
    <>
      <div className="services-gallery-stack" aria-label="Bildergalerie Dienstleistungen">
        {rows.map((row, rowIndex) => {
          const stackReverseIndex = rows.length - rowIndex - 1;
          return (
          <div
            key={`gallery-row-${rowIndex}`}
            className={`services-gallery-stack-row ${row.length === 1 ? 'is-single' : ''}`}
            style={{ '--stack-index': rowIndex, '--stack-reverse-index': stackReverseIndex }}
          >
            <div className="services-gallery-stack-shell">
              {row.map((item, columnIndex) => {
                const itemIndex = rowIndex * 2 + columnIndex;
                return <GalleryCard key={`${item.title}-${itemIndex}`} item={item} index={itemIndex} extraClass="gallery-card-stacked" />;
              })}
            </div>
          </div>
        );})}
      </div>

      <div className="services-gallery-mobile-wrap">
        <MobileSnapCarousel className="services-gallery services-gallery-mosaic">
          {items.map((item, index) => (
            <GalleryCard key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </MobileSnapCarousel>
      </div>
    </>
  );
}

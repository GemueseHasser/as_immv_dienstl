import React from 'react';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { Paper } from '@mui/material';
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
  const desktopRows = [];
  for (let index = 0; index < items.length; index += 2) {
    desktopRows.push(items.slice(index, index + 2));
  }

  return (
    <>
      <div className="services-gallery-stack services-gallery-stack-desktop" aria-label="Bildergalerie Dienstleistungen">
        {desktopRows.map((row, rowIndex) => {
          const stackReverseIndex = desktopRows.length - rowIndex - 1;
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
          );
        })}
      </div>

      <div className="services-gallery-stack services-gallery-stack-mobile" aria-label="Mobile Bildergalerie Dienstleistungen">
        {items.map((item, index) => {
          const stackReverseIndex = items.length - index - 1;
          return (
            <div
              key={`mobile-gallery-row-${index}`}
              className="services-gallery-stack-row is-mobile-single"
              style={{ '--stack-index': index, '--stack-reverse-index': stackReverseIndex }}
            >
              <div className="services-gallery-stack-shell">
                <GalleryCard key={`${item.title}-${index}`} item={item} index={index} extraClass="gallery-card-stacked" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

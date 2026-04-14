import React from 'react';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Paper } from '@mui/material';
import MobileSnapCarousel from './MobileSnapCarousel';
import BrandLogos from './BrandLogos';
import { AccentChip } from './ui';

const pickIcon = (tag = '') => {
  const value = tag.toLowerCase();
  if (value.includes('immobil')) return <ApartmentRoundedIcon />;
  if (value.includes('miet') || value.includes('maschinen') || value.includes('anbau') || value.includes('digital')) return <HandymanRoundedIcon />;
  return <AddTaskRoundedIcon />;
};

export default function ServiceGrid({ items, logoType = null, variant = "default" }) {
  return (
    <MobileSnapCarousel className="card-grid">
      {items.map((item) => (
        <Paper
          key={item.title}
          component="article"
          elevation={0}
          className={["soft-card", "soft-card-enhanced", variant === "dark" ? "soft-card-dark" : "", logoType ? 'soft-card-with-brand' : ''].filter(Boolean).join(' ')}
        >
          {logoType ? (
            <div className="soft-card-brand-mark" aria-hidden="true">
              <BrandLogos variant="watermark" single={logoType} />
            </div>
          ) : null}
          <div className="soft-card-copy">
            {item.tag ? <AccentChip className="service-chip" icon={pickIcon(item.tag)} label={item.tag} size="small" /> : null}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </Paper>
      ))}
    </MobileSnapCarousel>
  );
}

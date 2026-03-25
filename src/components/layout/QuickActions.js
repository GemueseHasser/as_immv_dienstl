import React from 'react';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { Fab, Tooltip, Zoom } from '@mui/material';

export default function QuickActions({ onOpenContact }) {
  return (
    <div className="quick-actions" aria-label="Schnellaktionen">
      <Zoom in>
        <Tooltip title="Kontaktanfrage stellen" placement="left">
          <Fab
            color="primary"
            className="quick-fab quick-fab-brand quick-fab-mui"
            onClick={onOpenContact}
            aria-label="Kontaktanfrage stellen"
          >
            <ForumRoundedIcon />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom in style={{ transitionDelay: '70ms' }}>
        <Tooltip title="Anrufen" placement="left">
          <Fab
            component="a"
            color="secondary"
            className="quick-fab quick-fab-mobile quick-fab-mui"
            href="tel:+492102706362"
            aria-label="Anrufen"
          >
            <CallRoundedIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </div>
  );
}

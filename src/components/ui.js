import React from 'react';
import { alpha } from '@mui/material/styles';
import { Button, Chip } from '@mui/material';

export function PremiumButton({ children, variant = 'contained', startIcon, endIcon, className = '', sx = {}, ...props }) {
  const isContained = variant === 'contained';
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      sx={{
        minHeight: 48,
        px: 2.5,
        borderRadius: '999px',
        border: isContained ? '1px solid rgba(35,39,43,0.08)' : '1px solid rgba(35,39,43,0.1)',
        background: isContained
          ? 'linear-gradient(135deg, rgba(58,64,69,0.98), rgba(31,35,39,0.98))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.94), rgba(246,242,236,0.92))',
        color: isContained ? '#fff' : 'text.primary',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 22px 46px rgba(17,20,24,0.16)',
          background: isContained
            ? 'linear-gradient(135deg, rgba(58,64,69,1), rgba(31,35,39,1))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,245,240,0.98))',
        },
        transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export function AccentChip({ icon, label, className = '', sx = {}, ...props }) {
  return (
    <Chip
      icon={icon}
      label={label}
      className={className}
      sx={{
        background: alpha('#ffffff', 0.74),
        border: '1px solid rgba(35,39,43,0.08)',
        boxShadow: '0 12px 30px rgba(17,20,24,0.06)',
        '.MuiChip-icon': { color: 'primary.main' },
        ...sx,
      }}
      {...props}
    />
  );
}

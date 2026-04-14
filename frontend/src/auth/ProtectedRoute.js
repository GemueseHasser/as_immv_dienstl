import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '50vh' }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!isAuthenticated) return <Navigate to="/anmelden" replace state={{ from: location.pathname }} />;
  if (adminOnly && !isAdmin) return <Navigate to="/immobilienverwaltung/wohnungen" replace />;
  return children;
}

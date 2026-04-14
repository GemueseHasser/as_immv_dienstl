import React, { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import VerwaltungPage from './pages/VerwaltungPage';
import DienstleistungenPage from './pages/DienstleistungenPage';
import KontaktPage from './pages/KontaktPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import WohnungenPage from './pages/WohnungenPage';
import WohnungDetailPage from './pages/WohnungDetailPage';
import AuthPage from './pages/AuthPage';
import AdminWohnungenPage from './pages/AdminWohnungenPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ContactModal from './components/ContactModal';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

export const ContactModalContext = React.createContext({ openContact: () => {} });

function LegacyWohnungRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/immobilienverwaltung/wohnungen/${slug}`} replace />;
}

export default function App() {
  const [contactState, setContactState] = useState({
    open: false,
    initialCategory: null,
    initialService: null,
  });

  const openContact = (options = {}) => {
    setContactState({
      open: true,
      initialCategory: options.initialCategory ?? null,
      initialService: options.initialService ?? null,
    });
  };

  const closeContact = () => {
    setContactState((current) => ({ ...current, open: false }));
  };

  return (
    <AuthProvider>
      <ContactModalContext.Provider value={{ openContact }}>
        <Routes>
          <Route element={<SiteLayout onOpenContact={openContact} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/immobilienverwaltung" element={<VerwaltungPage />} />
            <Route path="/immobilienverwaltung/referenzen" element={<Navigate to="/immobilienverwaltung" replace />} />
            <Route path="/immobilienverwaltung/wohnungen" element={<WohnungenPage />} />
            <Route path="/immobilienverwaltung/wohnungen/:slug" element={<WohnungDetailPage />} />
            <Route path="/wohnungen" element={<Navigate to="/immobilienverwaltung/wohnungen" replace />} />
            <Route path="/wohnungen/:slug" element={<LegacyWohnungRedirect />} />
            <Route path="/anmelden" element={<AuthPage />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/benutzer" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
            <Route path="/admin/wohnungen" element={<ProtectedRoute adminOnly><AdminWohnungenPage /></ProtectedRoute>} />
            <Route path="/admin/wohnungen/:id" element={<ProtectedRoute adminOnly><AdminWohnungenPage /></ProtectedRoute>} />
            <Route path="/dienstleistungen" element={<DienstleistungenPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/referenzen" element={<Navigate to="/immobilienverwaltung" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <ContactModal
          open={contactState.open}
          onClose={closeContact}
          initialCategory={contactState.initialCategory}
          initialService={contactState.initialService}
        />
      </ContactModalContext.Provider>
    </AuthProvider>
  );
}

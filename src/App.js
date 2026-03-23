import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import VerwaltungPage from './pages/VerwaltungPage';
import DienstleistungenPage from './pages/DienstleistungenPage';
import KontaktPage from './pages/KontaktPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import ContactModal from './components/ContactModal';

export const ContactModalContext = React.createContext({ openContact: () => {} });

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
    <ContactModalContext.Provider value={{ openContact }}>
      <Routes>
        <Route element={<SiteLayout onOpenContact={openContact} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/immobilienverwaltung" element={<VerwaltungPage />} />
          <Route path="/immobilienverwaltung/referenzen" element={<Navigate to="/immobilienverwaltung" replace />} />
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
  );
}

import React, { useContext, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PageHero from '../components/PageHero';
import ContactPanel from '../components/ContactPanel';
import { PremiumButton } from '../components/ui';
import { ContactModalContext } from '../App';

export default function KontaktPage() {
  const { openContact } = useContext(ContactModalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Direkter Kontakt für Immobilienverwaltung, Dienstleistungen und konkrete Vorhaben."
        text="Ob es um die laufende Betreuung einer Immobilie oder um praktische Leistungen vor Ort geht: AS Immobilienverwaltung & Dienstleistungen ist telefonisch, per E-Mail und über die digitale Anfrage erreichbar."
        actions={<PremiumButton type="button" endIcon={<SendRoundedIcon />} onClick={() => openContact()}>Anfrage starten</PremiumButton>}
      />
      <ContactPanel />
    </>
  );
}

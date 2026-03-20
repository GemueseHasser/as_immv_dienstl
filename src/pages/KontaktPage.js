import React, { useContext } from 'react';
import PageHero from '../components/PageHero';
import ContactPanel from '../components/ContactPanel';
import { ContactModalContext } from '../App';

export default function KontaktPage() {
  const { openContact } = useContext(ContactModalContext);

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Direkter Kontakt für Verwaltung, Dienstleistungen und konkrete Vorhaben."
        text="Ob es um die laufende Betreuung einer Immobilie, um Erdarbeiten, um neue Pflasterflächen oder um BIM-gestützte Projektkoordination geht: AS Immobilienverwaltung & Dienstleistungen ist telefonisch, per E-Mail und über das Anfrageformular erreichbar."
        actions={<button type="button" className="button button-brand" onClick={openContact}>Kontaktformular öffnen</button>}
      />
      <ContactPanel />
    </>
  );
}

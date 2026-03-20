import React, { useContext } from 'react';
import PageHero from '../components/PageHero';
import ReferenceList from '../components/ReferenceList';
import { ContactModalContext } from '../App';
import { references } from '../data/siteContent';

export default function ReferenzenPage() {
  const { openContact } = useContext(ContactModalContext);

  return (
    <>
      <PageHero
        eyebrow="Immobilienverwaltung / Referenzen"
        title="Referenzen als Teil der Immobilienverwaltung."
        text="Die Referenzen sind bewusst in den Verwaltungsbereich eingeordnet. Sie belegen Betreuung, Bestandsnähe und die Verbindung aus kaufmännischer Organisation und technischer Begleitung."
        actions={<button type="button" className="button button-brand" onClick={openContact}>Anfragen</button>}
      />
      <section className="section">
        <div className="container stack-gap compact-shell">
          <ReferenceList items={references} />
        </div>
      </section>
    </>
  );
}

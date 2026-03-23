const publicAsset = (path) => `${process.env.PUBLIC_URL || ''}${path}`;

export const company = {
  name: 'AS Immobilienverwaltung & Dienstleistungen',
  owner: 'Axel Striemer',
  addressLine1: 'Am Stadtpark 25',
  addressLine2: '42489 Wülfrath',
  phone: '0 21 02 / 70 63 62',
  fax: '0 21 02 / 70 63 58',
  email: 'info@as-immobilienverwaltung.de',
  website: 'www.as-immobilienverwaltung.de',
};

export const strandCards = [
  {
    id: 'verwaltung',
    eyebrow: 'Immobilienverwaltung',
    title: 'Strukturierte Betreuung im laufenden Bestand',
    intro:
      'AS Immobilienverwaltung begleitet Eigentümer, Gemeinschaften und Bestände mit klaren Abläufen, persönlicher Erreichbarkeit und einem ruhigen Blick für das Wesentliche.',
    to: '/immobilienverwaltung',
    highlights: [
      'Kaufmännische und organisatorische Begleitung im Alltag',
      'Technische Abstimmung von Instandhaltung und Maßnahmen',
      'Persönliche Betreuung mit klaren Zuständigkeiten',
    ],
  },
  {
    id: 'dienstleistungen',
    eyebrow: 'Dienstleistungen',
    title: 'Praktische Leistungen rund um Fläche, Gelände und Zugang',
    intro:
      'Der Dienstleistungsbereich bündelt Erdarbeiten, Pflasterung, vorbereitende Maßnahmen, passenden Maschineneinsatz und auf Wunsch digitale Koordination über Building Information Modeling.',
    to: '/dienstleistungen',
    highlights: [
      'Zuwegungen, Zufahrten und belastbare Außenflächen',
      'Erdarbeiten, Trassen und vorbereitende Geländeaufbereitung',
      'BIM-gestützte Abstimmung von Planung und Ausführung',
    ],
  },
];

export const homeHighlights = [
  'Persönliche Betreuung von Wohn- und Gewerbeimmobilien in Wülfrath und Umgebung.',
  'Dienstleistungen für Außenflächen, Erdarbeiten, Pflasterung und koordinierte Ausführung.',
  'Direkter Kontakt per Telefon, E-Mail oder Anfrageformular – ohne Umwege.',
];

export const homeTeasers = [
  {
    tag: 'Immobilienverwaltung',
    title: 'Verlässlich geführt',
    text: 'Betreuung von Beständen mit geordneten Abläufen, technischer Übersicht und persönlicher Erreichbarkeit.',
  },
  {
    tag: 'Dienstleistungen',
    title: 'Sauber ausgeführt',
    text: 'Arbeiten an Fläche und Gelände mit Erfahrung, Maschinenunterstützung und einem klaren Blick für dauerhafte Ergebnisse.',
  },
  {
    tag: 'Kontakt',
    title: 'Direkt erreichbar',
    text: 'Anliegen zur Immobilienverwaltung, zu Außenarbeiten oder zu BIM-gestützter Projektkoordination werden gezielt aufgenommen.',
  },
];

export const verwaltungHighlights = [
  'Betreuung von Wohn- und Gewerbeimmobilien mit klarer Zuständigkeit.',
  'Kaufmännische, organisatorische und technische Begleitung im laufenden Betrieb.',
  'Regionaler Bezug mit Referenzen aus Wülfrath innerhalb des Verwaltungsbereichs.',
];

export const verwaltungServices = [
  {
    tag: 'Immobilienverwaltung',
    title: 'Laufende Objektbetreuung',
    text: 'Geordnete Abläufe, nachvollziehbare Kommunikation und eine verlässliche Betreuung im Alltag von Wohn- und Gewerbeimmobilien.',
  },
  {
    tag: 'Organisation',
    title: 'Kaufmännische und organisatorische Führung',
    text: 'Strukturierte Abstimmung laufender Themen, koordinierte Kommunikation und ein klarer Überblick über anstehende Aufgaben und Prozesse.',
  },
  {
    tag: 'Technik',
    title: 'Begleitung technischer Maßnahmen',
    text: 'Einordnung, Abstimmung und Begleitung technischer Themen und Instandhaltungsmaßnahmen im Bestand.',
  },
];

export const dienstleistungsServices = [
  {
    tag: 'Flächenbau',
    title: 'Pflaster- und Zuwegungsarbeiten',
    text: 'Herstellung und Überarbeitung von Zufahrten, Wegen, Stellflächen und belastbaren Außenbereichen mit sauberem Aufbau und klarer Linienführung.',
  },
  {
    tag: 'Gelände',
    title: 'Erdarbeiten und Trassen',
    text: 'Aushub, Leitungswege und vorbereitende Arbeiten im Bestand – abgestimmt auf Gelände, Nutzung und den weiteren Ausbau.',
  },
  {
    tag: 'Maschineneinsatz',
    title: 'Ausführung mit passender Technik',
    text: 'Effiziente Abläufe vor Ort durch geeignete Maschinen, präzise Arbeitsschritte und eine robuste Umsetzung auf dem Grundstück.',
  },
  {
    tag: 'BIM',
    title: 'Building Information Modeling',
    text: 'Digitale Koordination von Bestand, Planung und Ausführung, wenn Projekte eine strukturierte Abstimmung von Flächen, Trassen oder Bauabläufen erfordern.',
  },
];

export const dienstleistungsGallery = [
  {
    image: publicAsset('/assets/dl1.jpg'),
    category: 'Pflasterung & Konstruktion',
    title: 'Außenflächen mit tragender Stahlkonstruktion',
    text: 'Pflasterfläche und Tragwerk werden sauber aufeinander abgestimmt, damit belastbare Nutzflächen mit klarer Geometrie und präzisem Anschluss entstehen.',
  },
  {
    image: publicAsset('/assets/dl2.jpg'),
    category: 'Unterbau & Zuwegung',
    title: 'Vorbereitete Zufahrten mit exakter Linienführung',
    text: 'Tragschichten, Randbereiche und Fluchten werden so vorbereitet, dass eine dauerhaft stabile Zufahrt mit ruhigem Gesamtbild entsteht.',
  },
  {
    image: publicAsset('/assets/dl3.jpg'),
    category: 'Erdarbeiten & Trassen',
    title: 'Leitungsgräben und Geländeaufbereitung im Bestand',
    text: 'Erdarbeiten entlang bestehender Wege und Grundstücksgrenzen werden mit Blick auf Nutzung, Zugänglichkeit und den späteren Oberflächenaufbau ausgeführt.',
  },
  {
    image: publicAsset('/assets/dl4.jpg'),
    category: 'Maschineneinsatz',
    title: 'Leistungsfähige Technik für präzise Abläufe vor Ort',
    text: 'Der passende Maschineneinsatz sorgt für effiziente Arbeitsschritte, saubere Abläufe und eine zuverlässige Umsetzung auf dem Grundstück.',
  },
  {
    image: publicAsset('/assets/bim-visual.png'),
    category: 'Building Information Modeling',
    title: 'BIM als eigenes Planungs- und Koordinationswerkzeug',
    text: 'Digitale Modelle unterstützen die Abstimmung von Bestand, Planung und Ausführung – besonders dort, wo Flächen, Leitungswege und Bauabläufe präzise zusammengeführt werden müssen.',
  },
];

export const references = [
  {
    title: 'Flandersbach, Wülfrath',
    type: 'Verwaltungsreferenz',
    text: 'Flandersbach steht als Verwaltungsreferenz für die persönliche Betreuung von Wohnimmobilien mit kurzen Abstimmungswegen und einem ruhigen, verlässlichen Verwaltungsalltag.',
    image: publicAsset('/assets/flandersbach.jpg'),
    accent: 'warm',
  },
  {
    title: 'Görtzheide, Wülfrath',
    type: 'Verwaltungsreferenz',
    text: 'Görtzheide ergänzt den regionalen Referenzbereich und zeigt die strukturierte Begleitung von Bestandsimmobilien mit Fokus auf Übersicht, Erreichbarkeit und dauerhafte Objektqualität.',
    image: publicAsset('/assets/goertzheide.jpg'),
    accent: 'cool',
  },
];

export const contactHighlights = [
  'Anfragen zur Immobilienverwaltung, zu bestehenden Objekten oder zur laufenden Betreuung werden direkt aufgenommen.',
  'Dienstleistungsanfragen zu Erdarbeiten, Pflasterflächen, Zuwegungen oder Außenanlagen können gezielt beschrieben werden.',
  'Auch Fragen zur BIM-gestützten Projektkoordination lassen sich über das Anfrageformular oder telefonisch abstimmen.',
];

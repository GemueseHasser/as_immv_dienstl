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
    title: 'Maschinist, Maschine und digitale Lösungen aus einer Hand',
    intro:
      'Der Dienstleistungsbereich bündelt Mietmaschinisten, Maschinenverleih mit Maschinist, 3D-gesteuerten Maschineneinsatz mit verschiedensten Anbaugeräten sowie digitale Lösungen wie digitlae Geländemodelle (DGM), Punktwolken, 3D-Scanning und BIM-Unterstützung.',
    to: '/dienstleistungen',
    highlights: [
      'Mietmaschinist einzeln oder Maschine inklusive Maschinist',
      '3D-Steuerung, Tiltrotatoren und passende Anbaugeräte',
      'Lösungen über den Tellerrand hinaus für komplexe Einsätze',
    ],
  },
];

export const homeTeasers = [
  {
    tag: 'Erfahrung',
    title: 'Über 25 Jahre Praxis',
    text: 'AS Immobilienverwaltung & Dienstleistungen verbindet langjährige Erfahrung mit routinierter Ausführung, sauberer Organisation und einem sicheren Blick für praktikable Lösungen.',
  },
  {
    tag: 'Zertifizierung',
    title: 'IHK Düsseldorf zertifiziert',
    text: 'Die fachliche Qualifikation ist durch die IHK Düsseldorf zertifiziert und unterstreicht den Anspruch an verlässliche Betreuung, strukturierte Abläufe und nachvollziehbare Qualität.',
  },
  {
    tag: 'Dienstleistungen',
    title: 'Technik, Mensch und digitale Prozesse',
    text: 'Vom Mietmaschinisten über 3D-gesteuerte Maschinen bis zu Punktwolken, 3D-Scanning und BIM werden analoge und digitale Leistungen gezielt zusammengeführt.',
  },
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
    tag: 'Mietmaschinist',
    title: 'Maschinist als eigenständige Dienstleistung',
    text: 'Ein erfahrener Mietmaschinist kann gezielt für laufende Baustellen oder spezielle Aufgaben gebucht werden – flexibel, effizient und passend zum vorhandenen Maschinenpark.',
  },
  {
    tag: 'Maschinenverleih mit Maschinist',
    title: 'Maschine inklusive Bediener',
    text: 'Alternativ stehen Maschinen wie Radlader, Unimog, Mobil- und Minibagger inklusive Maschinist zur Verfügung, damit Einsätze sicher, wirtschaftlich und ohne zusätzlichen Abstimmungsaufwand umgesetzt werden können.',
  },
  {
    tag: '3D-Steuerung & DGM',
    title: 'Digitale Geländemodelle direkt in der Ausführung',
    text: 'Die Mietmaschinen verfügen über 3D-Steuerung und verarbeiten digitale Geländemodelle (DGM), damit Höhen, Flächen und Bewegungen präzise und nachvollziehbar umgesetzt werden.',
  },
  {
    tag: 'Anbaugeräte & Tiltrotatoren',
    title: 'Für jede Anforderung passend ausgestattet',
    text: 'Über die 3D-Steuerung hinaus stehen Mobil- und Minibagger mit Tiltrotatoren sowie vielseitigen Anbaugeräten bereit – vom Anbauverdichter bis zur Heckenschere.',
  },
  {
    tag: 'Digitale Lösungen',
    title: 'Punktwolken, 3D-Scanning und BIM-Unterstützung',
    text: 'Digitale Lösungen wie Punktwolken oder 3D-Scanning werden ebenso angeboten wie die Unterstützung von BIM-Projekten, wenn Planung, Bestand und Ausführung sauber zusammengeführt werden sollen.',
  },
  {
    tag: 'Lösungsansätze',
    title: 'Über den Tellerrand hinaus gedacht',
    text: 'Nicht nur Erd- oder Tiefbauleistungen stehen im Fokus: Für komplexe Aufgaben werden unkonventionelle Lösungsansätze entwickelt, bei denen Maschinen auch andere Gewerke wirksam unterstützen.',
  },
];

export const dienstleistungsGallery = [
  {
    image: publicAsset('/assets/3d-steuerung.jpg'),
    category: '3D-Steuerung & DGM',
    title: 'Digitale Geländemodelle direkt im Bagger verarbeitet',
    text: 'Die 3D-Steuerung unterstützt eine präzise Ausführung auf Grundlage digitaler Geländemodelle und schafft saubere Abläufe zwischen Planung und Baustelle.',
    size: 'wide',
  },
  {
    image: publicAsset('/assets/anbaugeraete.jpg'),
    category: 'Anbaugeräte',
    title: 'Vielfältige Ausstattung für spezielle Anforderungen',
    text: 'Anbaugeräte erweitern das Einsatzspektrum deutlich und schaffen flexible Lösungen für Verdichtung, Greifen, Stemmen oder Sonderaufgaben.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/heckenschere.jpg'),
    category: 'Pflege & Rückschnitt',
    title: 'Heckenschere für den Mobilbagger im praktischen Einsatz',
    text: 'Auch außerhalb klassischer Erdarbeiten können Maschinen andere Gewerke unterstützen und Arbeiten an schwer zugänglichen Bereichen effizient übernehmen.',
    size: 'tall',
  },
  {
    image: publicAsset('/assets/dl1.jpg'),
    category: 'Unzugängliche Stellen & Präzision',
    title: 'Arbeiten in engen und verwinkelten Bereichen mit passender Technik',
    text: 'Durch genau auf die Anforderungen abgestimmten Maschineneinsatz können auch in engen und verwinkelten Bereichen präzise Arbeiten erfolgen.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/dl2.jpg'),
    category: 'Ganzjährig einsatzbereit',
    title: 'Robuste Technik auch bei widrigen Bedingungen',
    text: 'Verlässlicher Maschineneinsatz ist nicht auf Schönwetterlagen beschränkt und kann auch unter schwierigen Witterungsbedingungen planbar umgesetzt werden.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/dl3.jpg'),
    category: 'Maschineneinsatz',
    title: 'Großflächige Entfernung von Pflanzen',
    text: 'Um beispielsweise das Entfernen von vielen Pflanzen zu erleichtern, können Maschinen mit Fingerspitzengefühl eingesetzt werden.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/dl4.jpg'),
    category: 'Präzision & Kontrolle',
    title: 'Maschinenverleih mit Maschinist als eingespielte Einheit',
    text: 'Auch bei sperrigen Bauteilen und engen Bereichen kann maximale Genauigkeit gewährleistet werden - zusätzlich noch durch den Einsatz von moderner 3D-Steuerung.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/dl5.jpg'),
    category: 'Präzision im Graben',
    title: 'Minibagger für enge Arbeitsräume und sensible Leitungsbereiche',
    text: 'Kompakte Maschinen eignen sich für präzise Arbeiten in begrenzten Bereichen und ergänzen den Maschinenpark für unterschiedlichste Anforderungen.',
    size: 'tall',
  },
  {
    image: publicAsset('/assets/dl6.jpg'),
    category: 'Maschinenübergreifender Einsatz',
    title: 'Verschiedene Maschinen werden kombiniert, um ein optimales Ergebnis zu erzielen',
    text: 'Durch das Zusammenspiel von mehreren Maschinen kann ein optimales, schnelles und zugleich wirtschaftliches Ergebnis garantiert werden.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/gewerke-unterstuetzen.jpg'),
    category: 'Gewerkeübergreifende Unterstützung',
    title: 'Maschinen als Unterstützung für andere Arbeitsbereiche',
    text: 'Ob Montage, Transport, Pflege oder Vorbereitung: Der Maschinenpark kann gezielt dort unterstützen, wo klassische Lösungen an Grenzen stoßen.',
    size: 'wide',
  },
  {
    image: publicAsset('/assets/unkonventionell.jpg'),
    category: 'Unkonventionelle Ansätze',
    title: 'Für komplexe Probleme werden neue Wege gefunden',
    text: 'Nicht jede Aufgabe passt in ein Standardschema – deshalb werden individuelle und über den Tellerrand hinaus gedachte Lösungsansätze entwickelt.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/grillen.jpg'),
    category: 'Spaß an der Arbeit',
    title: 'Grillabend in der Baggerschaufel',
    text: 'Durch den Spaß an der Arbeit bleiben sowohl Kreativität als auch Professionalität erhalten.',
    size: 'standard',
  },
  {
    image: publicAsset('/assets/bim-visual.png'),
    category: 'BIM-Projekt',
    title: 'Durch BIM-Projekte Genauigkeit garantiert',
    text: 'Der Einsatz von BIM (Building Information Modeling) bringt vor allem einen großen Vorteil: alles wird digital geplant, abgestimmt und kontrolliert – bevor gebaut wird. Dadurch entstehen weniger Fehler, mehr Effizienz und bessere Ergebnisse.',
    size: 'standard',
  }
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
  'Dienstleistungsanfragen zu Mietmaschinisten, Maschinen mit Maschinist, 3D-Steuerung, Anbaugeräten oder digitalen Lösungen können gezielt beschrieben werden.',
  'Auch Fragen zu Punktwolken, 3D-Scanning und BIM-gestützter Projektkoordination lassen sich über das Anfrageformular oder telefonisch abstimmen.',
];

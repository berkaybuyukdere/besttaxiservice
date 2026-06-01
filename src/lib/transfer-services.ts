export const TRANSFER_SERVICES = {
  'flughafen-abholung': {
    titleDe: 'Flughafen Abholung',
    titleEn: 'Airport Pickup',
    icon: 'PlaneLanding',
    descriptionDe:
      'Pünktliche Abholung am Zürich Flughafen (ZRH). Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an – ohne Aufpreis bei Verspätung.',
    featuresDe: ['Flugverfolgung inklusive', 'Meet & Greet am Terminal', 'Fixpreis garantiert', 'Gratis Kindersitze'],
    priceFrom: 70,
  },
  'flughafen-absetzen': {
    titleDe: 'Flughafen Absetzen',
    titleEn: 'Airport Drop-off',
    icon: 'PlaneTakeoff',
    descriptionDe:
      'Stressfreier Transfer zum Flughafen Zürich. Professionelle Fahrer, komfortable Fahrzeuge, garantierte Pünktlichkeit.',
    featuresDe: ['Tür-zu-Terminal Service', 'Gepäckhilfe', '7/24 verfügbar', 'Alle Zahlungsarten'],
    priceFrom: 70,
  },
  geschaeftsreisen: {
    titleDe: 'Geschäftsreisen',
    titleEn: 'Business Travel',
    icon: 'Briefcase',
    descriptionDe:
      'Diskreter Chauffeur-Service für Geschäftsreisende. S-Klasse, V-Class oder Maybach – mit Rechnungsstellung für Firmen.',
    featuresDe: ['Rechnung auf Firmenname', 'WLAN im Fahrzeug', 'Stilles Arbeiten möglich', 'VIP-Empfang'],
    priceFrom: 90,
  },
  gruppenfahrten: {
    titleDe: 'Gruppenfahrten',
    titleEn: 'Group Transfers',
    icon: 'Users',
    descriptionDe:
      'Großzügige Vans für Gruppen bis 7 Personen. Ideal für Familien, Events, Konferenzen und Ski-Gruppen.',
    featuresDe: ['Bis 7 Passagiere', '7 Gepäckstücke', 'Ein Fahrzeug – ein Preis', 'Ski-Equipment möglich'],
    priceFrom: 80,
  },
  'vip-chauffeur': {
    titleDe: 'VIP Chauffeur',
    titleEn: 'VIP Chauffeur',
    icon: 'Crown',
    descriptionDe:
      'Mercedes V300 Maybach oder S-Klasse mit erfahrenem Chauffeur. Diskretion, Komfort und Stil für anspruchsvolle Kunden.',
    featuresDe: ['Maybach V300', 'Chauffeur in Anzug', 'Champagner auf Anfrage', 'Priority-Handling'],
    priceFrom: 90,
  },
  'stundlicher-service': {
    titleDe: 'Stündlicher Service',
    titleEn: 'Hourly Service',
    icon: 'Clock',
    descriptionDe:
      'Flexibler Chauffeur stundenweise – Stadtrundfahrten, mehrere Stopps, Events. CHF 90/h, Tagespauschale CHF 900 (8.5h / 250km).',
    featuresDe: ['Ab 1 Stunde buchbar', 'Mehrere Stopps', 'Stadt & Region', 'Tagespauschale verfügbar'],
    priceFrom: 90,
  },
  'ski-transfer': {
    titleDe: 'Ski Transfer',
    titleEn: 'Ski Transfer',
    icon: 'Mountain',
    descriptionDe:
      'Direkttransfer zum Skigebiet: Davos, St. Moritz, Engelberg und mehr. Grossraum-Van mit Skihalterung auf Anfrage.',
    featuresDe: ['Davos ab CHF 600', 'St. Moritz ab CHF 750', 'Skiausrüstung Platz', 'Winterreifen & Ketten'],
    priceFrom: 350,
  },
} as const;

export type TransferServiceSlug = keyof typeof TRANSFER_SERVICES;

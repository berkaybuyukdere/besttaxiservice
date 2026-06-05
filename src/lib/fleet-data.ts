export type FleetVehicle = {
  id: string;
  vehicleType: 'BUSINESS_FAMILY' | 'VIP_ULTRA_COMFORT' | 'PREMIUM_CLASS';
  name: string;
  model: string;
  capacity: number;
  luggage: number;
  startPrice: number;
  multiplier: number;
  image: string;
  description: string;
  recommended?: boolean;
};

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: 's-class',
    vehicleType: 'PREMIUM_CLASS',
    name: 'Mercedes S-Klasse',
    model: 'Premium Limousine',
    capacity: 3,
    luggage: 3,
    startPrice: 110,
    multiplier: 1.5,
    image: '/images/fleet/sklasse.png',
    description:
      'Unser Flaggschiff für anspruchsvolle Geschäftsreisende. Diskretion, Komfort und stilvolle Ankunft an jedem Ziel.',
    recommended: true,
  },
  {
    id: 'a8',
    vehicleType: 'VIP_ULTRA_COMFORT',
    name: 'Audi A8',
    model: 'Executive Limousine',
    capacity: 3,
    luggage: 3,
    startPrice: 105,
    multiplier: 1.45,
    image: '/images/fleet/a8.png',
    description:
      'Ruhe und Präzision auf höchstem Niveau. Ideal für VIP-Transfers und repräsentative Fahrten.',
  },
  {
    id: 'e-class',
    vehicleType: 'VIP_ULTRA_COMFORT',
    name: 'Mercedes E-Klasse',
    model: 'Business Limousine',
    capacity: 3,
    luggage: 3,
    startPrice: 90,
    multiplier: 1.3,
    image: '/images/fleet/eklasse.png',
    description:
      'Der perfekte Begleiter für Business-Termine und Flughafentransfers mit stilvollem Auftreten.',
  },
  {
    id: 'v-class',
    vehicleType: 'BUSINESS_FAMILY',
    name: 'Mercedes V-Klasse',
    model: 'Business & Family',
    capacity: 7,
    luggage: 7,
    startPrice: 70,
    multiplier: 1.0,
    image: '/images/fleet/vklasse.png',
    description:
      'Geräumig und komfortabel für Familien, Gruppen und viel Gepäck — der Klassiker für Flughafentransfers.',
  },
  {
    id: 'gle',
    vehicleType: 'BUSINESS_FAMILY',
    name: 'Mercedes GLE',
    model: 'Premium SUV',
    capacity: 5,
    luggage: 5,
    startPrice: 95,
    multiplier: 1.2,
    image: '/images/fleet/gle.png',
    description:
      'Kombiniert SUV-Komfort mit eleganter Präsenz — ideal für anspruchsvolle Fahrten in jeder Jahreszeit.',
  },
];

export function getFleetById(id: string) {
  return FLEET_VEHICLES.find((v) => v.id === id);
}

export function getFleetByType(type: string) {
  return FLEET_VEHICLES.find((v) => v.vehicleType === type);
}

import { PRICING_DATA, FIXED_ROUTES } from './pricing-data';

const POPULAR = [
  'Zürich',
  'Luzern',
  'Basel',
  'Bern',
  'Davos',
  'St. Moritz',
  'Bad Ragaz',
  'Genf',
  'Interlaken',
  'Lausanne',
  'Winterthur',
  'Zug',
  'Uster',
  'Wetzikon',
  'Rapperswil',
  'Chur',
  'Lugano',
];

export const SWISS_DESTINATIONS = [
  ...new Set([
    ...PRICING_DATA.map((p) => p.location),
    ...FIXED_ROUTES.filter((r) => r.to && !r.to.includes('/')).map((r) => r.to),
    ...POPULAR,
  ]),
].sort((a, b) => a.localeCompare(b, 'de'));

export function searchSwissLocations(query: string, limit = 8): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return SWISS_DESTINATIONS.slice(0, 8);
  return SWISS_DESTINATIONS.filter((loc) => loc.toLowerCase().includes(q)).slice(0, limit);
}

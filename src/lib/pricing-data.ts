export interface PricingEntry {
  region: string;
  location: string;
  taxiToAirport: number;
  vanToAirport: number;
  taxiToZurich: number;
  vanToZurich: number;
}

export const PRICING_DATA: PricingEntry[] = [
  // WINTERTHUR
  { region: 'WINTERTHUR', location: 'Winterthur', taxiToAirport: 100, vanToAirport: 110, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'WINTERTHUR', location: 'Effretikon & Kemptthal', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 90, vanToZurich: 100 },
  { region: 'WINTERTHUR', location: 'Illnau & Lindau', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 90, vanToZurich: 100 },
  { region: 'WINTERTHUR', location: 'Neftenbach', taxiToAirport: 90, vanToAirport: 100, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'WINTERTHUR', location: 'Pfunden', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 90, vanToZurich: 100 },
  { region: 'WINTERTHUR', location: 'Henggart & Hettlingen', taxiToAirport: 110, vanToAirport: 120, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'WINTERTHUR', location: 'Elsau', taxiToAirport: 110, vanToAirport: 120, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'WINTERTHUR', location: 'Frauenfeld', taxiToAirport: 180, vanToAirport: 190, taxiToZurich: 190, vanToZurich: 200 },

  // ZÜRICH OBERLAND
  { region: 'ZÜRICH OBERLAND', location: 'Turbenthal', taxiToAirport: 130, vanToAirport: 140, taxiToZurich: 140, vanToZurich: 150 },
  { region: 'ZÜRICH OBERLAND', location: 'Bauma', taxiToAirport: 150, vanToAirport: 160, taxiToZurich: 160, vanToZurich: 170 },
  { region: 'ZÜRICH OBERLAND', location: 'Wetzikon', taxiToAirport: 110, vanToAirport: 120, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'ZÜRICH OBERLAND', location: 'Pfäffikon ZH', taxiToAirport: 110, vanToAirport: 120, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'ZÜRICH OBERLAND', location: 'Uster', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 80, vanToZurich: 90 },
  { region: 'ZÜRICH OBERLAND', location: 'Volketswil', taxiToAirport: 70, vanToAirport: 80, taxiToZurich: 70, vanToZurich: 80 },
  { region: 'ZÜRICH OBERLAND', location: 'Hinwil', taxiToAirport: 110, vanToAirport: 120, taxiToZurich: 130, vanToZurich: 140 },
  { region: 'ZÜRICH OBERLAND', location: 'Rüti ZH', taxiToAirport: 180, vanToAirport: 190, taxiToZurich: 140, vanToZurich: 150 },
  { region: 'ZÜRICH OBERLAND', location: 'Rapperswil', taxiToAirport: 210, vanToAirport: 220, taxiToZurich: 180, vanToZurich: 190 },

  // GOLDKÜSTE
  { region: 'GOLDKÜSTE', location: 'Stäfa', taxiToAirport: 150, vanToAirport: 160, taxiToZurich: 90, vanToZurich: 100 },
  { region: 'GOLDKÜSTE', location: 'Männedorf', taxiToAirport: 130, vanToAirport: 140, taxiToZurich: 80, vanToZurich: 90 },
  { region: 'GOLDKÜSTE', location: 'Meilen', taxiToAirport: 120, vanToAirport: 130, taxiToZurich: 70, vanToZurich: 80 },
  { region: 'GOLDKÜSTE', location: 'Herrliberg', taxiToAirport: 100, vanToAirport: 110, taxiToZurich: 60, vanToZurich: 70 },
  { region: 'GOLDKÜSTE', location: 'Erlenbach', taxiToAirport: 90, vanToAirport: 100, taxiToZurich: 60, vanToZurich: 70 },
  { region: 'GOLDKÜSTE', location: 'Küsnacht', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 50, vanToZurich: 60 },
  { region: 'GOLDKÜSTE', location: 'Zollikerberg & Zollikon', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 40, vanToZurich: 50 },

  // RECHTE ZÜRICH-SEESEITE
  { region: 'RECHTE ZÜRICH-SEESEITE', location: 'Adliswil & Kirchberg', taxiToAirport: 80, vanToAirport: 90, taxiToZurich: 30, vanToZurich: 40 },
  { region: 'RECHTE ZÜRICH-SEESEITE', location: 'Thalwil & Rüschlikon', taxiToAirport: 90, vanToAirport: 100, taxiToZurich: 50, vanToZurich: 60 },
  { region: 'RECHTE ZÜRICH-SEESEITE', location: 'Horgen', taxiToAirport: 120, vanToAirport: 130, taxiToZurich: 80, vanToZurich: 90 },
  { region: 'RECHTE ZÜRICH-SEESEITE', location: 'Au ZH & Wädenswil', taxiToAirport: 130, vanToAirport: 140, taxiToZurich: 90, vanToZurich: 100 },
  { region: 'RECHTE ZÜRICH-SEESEITE', location: 'Richterswil & Samstagern', taxiToAirport: 140, vanToAirport: 150, taxiToZurich: 100, vanToZurich: 110 },

  // KANTON SCHWYZ
  { region: 'KANTON SCHWYZ', location: 'Wollerau / Bäch SZ', taxiToAirport: 150, vanToAirport: 160, taxiToZurich: 120, vanToZurich: 130 },
  { region: 'KANTON SCHWYZ', location: 'Schindellegi & Feusisberg', taxiToAirport: 160, vanToAirport: 170, taxiToZurich: 130, vanToZurich: 140 },
  { region: 'KANTON SCHWYZ', location: 'Lachen SZ & Altendorf SZ', taxiToAirport: 220, vanToAirport: 230, taxiToZurich: 170, vanToZurich: 180 },
  { region: 'KANTON SCHWYZ', location: 'Hurden SZ & Pfäffikon SZ & Freienbach SZ', taxiToAirport: 180, vanToAirport: 190, taxiToZurich: 140, vanToZurich: 150 },

  // KANTON ZUG
  { region: 'KANTON ZUG', location: 'Zug', taxiToAirport: 170, vanToAirport: 180, taxiToZurich: 130, vanToZurich: 140 },
  { region: 'KANTON ZUG', location: 'Baar', taxiToAirport: 180, vanToAirport: 190, taxiToZurich: 140, vanToZurich: 150 },
  { region: 'KANTON ZUG', location: 'Cham / Steinhausen', taxiToAirport: 150, vanToAirport: 160, taxiToZurich: 120, vanToZurich: 130 },
];

export const FIXED_ROUTES = [
  { from: 'Stadt Zürich', to: 'Flughafen', price: 70, onRequest: false },
  { from: 'Flughafen', to: 'Davos', price: 600, onRequest: false },
  { from: 'Flughafen', to: 'St. Moritz', price: 750, onRequest: false },
  { from: 'Flughafen', to: 'Bad Ragaz', price: 350, onRequest: false },
  { from: 'Flughafen', to: 'Basel', price: 350, onRequest: false },
  { from: 'Flughafen', to: 'Bern', price: 500, onRequest: false },
  { from: 'Flughafen', to: 'Genf', price: 1000, onRequest: false },
  { from: 'Flughafen', to: 'Milano', price: null, onRequest: true },
  { from: 'Flughafen', to: 'München', price: null, onRequest: true },
  { from: 'Tages Pauschale', to: '250 km / 8.5 Std', price: 900, onRequest: false },
];

export const REGIONS = [
  'WINTERTHUR',
  'ZÜRICH OBERLAND',
  'GOLDKÜSTE',
  'RECHTE ZÜRICH-SEESEITE',
  'KANTON SCHWYZ',
  'KANTON ZUG',
] as const;

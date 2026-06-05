export type RouteInfo = {
  to: string;
  slug: string;
  km: number;
  duration: string;
  type: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
};

export const POPULAR_ROUTES: RouteInfo[] = [
  { to: 'Zug', slug: 'zug', km: 46, duration: '55 min', type: 'Taxi', price: 138.69, oldPrice: 176, discount: 21 },
  { to: 'Luzern', slug: 'luzern', km: 63, duration: '1h 16m', type: 'Taxi', price: 189.75, oldPrice: 241, discount: 21 },
  { to: 'Basel', slug: 'basel', km: 86, duration: '1h 43m', type: 'Taxi', price: 258.5, oldPrice: 328, discount: 21 },
  { to: 'Davos', slug: 'davos', km: 150, duration: '2h 20m', type: 'Van', price: 600, oldPrice: null, discount: null },
  { to: 'St. Moritz', slug: 'st-moritz', km: 185, duration: '2h 45m', type: 'Van', price: 750, oldPrice: null, discount: null },
  { to: 'Bern', slug: 'bern', km: 125, duration: '1h 50m', type: 'Taxi', price: 500, oldPrice: 620, discount: 19 },
];

export function getRouteBySlug(slug: string): RouteInfo | undefined {
  const normalized = slug.replace(/^zuerich-flughafen-/, '');
  return POPULAR_ROUTES.find((r) => r.slug === normalized);
}

export function routePageSlug(route: RouteInfo): string {
  return `zuerich-flughafen-${route.slug}`;
}

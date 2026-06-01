import { writeFileSync } from 'node:fs';
import { PRICING_DATA, FIXED_ROUTES } from '../src/lib/pricing-data.ts';

function esc(s) {
  return String(s).replace(/'/g, "''");
}

function id(s) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const pricingRows = PRICING_DATA.map(
  (e) =>
    `('${esc(id(`${e.region}-${e.location}`))}', '${esc(e.region)}', '${esc(e.location)}', ${e.taxiToAirport}, ${e.vanToAirport}, ${e.taxiToZurich}, ${e.vanToZurich}, NOW())`
).join(',\n  ');

const routeRows = FIXED_ROUTES.map(
  (r) =>
    `('${esc(id(`${r.from}-${r.to}`))}', '${esc(r.from)}', '${esc(r.to)}', ${r.price ?? 'NULL'}, ${r.onRequest}, ${r.description ? `'${esc(r.description)}'` : 'NULL'}, NOW(), NOW())`
).join(',\n  ');

const sql = `-- Auto-generated — run in Supabase SQL Editor after supabase-init.sql
INSERT INTO "Pricing" ("id", "region", "location", "taxiToAirport", "vanToAirport", "taxiToZurich", "vanToZurich", "updatedAt")
VALUES
  ${pricingRows}
ON CONFLICT ("id") DO UPDATE SET
  "taxiToAirport" = EXCLUDED."taxiToAirport",
  "vanToAirport" = EXCLUDED."vanToAirport",
  "taxiToZurich" = EXCLUDED."taxiToZurich",
  "vanToZurich" = EXCLUDED."vanToZurich",
  "updatedAt" = NOW();

INSERT INTO "FixedRoute" ("id", "from", "to", "price", "onRequest", "description", "createdAt", "updatedAt")
VALUES
  ${routeRows}
ON CONFLICT ("id") DO UPDATE SET
  "price" = EXCLUDED."price",
  "onRequest" = EXCLUDED."onRequest",
  "updatedAt" = NOW();
`;

writeFileSync('prisma/supabase-seed-pricing.sql', sql);
console.log('Wrote prisma/supabase-seed-pricing.sql');

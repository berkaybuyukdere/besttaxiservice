#!/usr/bin/env node
/**
 * Regenerates clean SQL files (no dotenv / Prisma log noise).
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

function cleanSql(raw) {
  return raw
    .split('\n')
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;
      if (t.startsWith('◇')) return false;
      if (t.startsWith('warn ')) return false;
      if (t.startsWith('Loaded Prisma')) return false;
      if (t.startsWith('For more information')) return false;
      return true;
    })
    .join('\n')
    .trimStart();
}

const env = {
  ...process.env,
  DOTENV_CONFIG_QUIET: 'true',
  NO_COLOR: '1',
};

console.log('Generating prisma/supabase-init.sql…');
const initRaw = execSync(
  'npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script',
  { encoding: 'utf8', env, stdio: ['pipe', 'pipe', 'pipe'] }
);
const initSql = cleanSql(initRaw);
writeFileSync('prisma/supabase-init.sql', initSql + '\n');

console.log('Generating prisma/supabase-seed-pricing.sql…');
execSync('npx tsx scripts/generate-pricing-seed-sql.mjs', { stdio: 'inherit' });

const minimal = readFileSync('prisma/supabase-seed-minimal.sql', 'utf8');
const pricing = cleanSql(readFileSync('prisma/supabase-seed-pricing.sql', 'utf8'));

const allInOne = [
  '-- Best Taxi Service — run entire file in Supabase SQL Editor',
  '-- Admin after run: admin@besttaxiservice.ch / admin123',
  '',
  initSql,
  '',
  minimal.trim(),
  '',
  pricing,
  '',
].join('\n');

writeFileSync('prisma/supabase-all-in-one.sql', allInOne);
console.log('✅ Wrote prisma/supabase-all-in-one.sql (clean)');

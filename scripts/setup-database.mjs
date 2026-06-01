#!/usr/bin/env node
/**
 * One command: npm run db:setup
 * Tries Prisma push + seed. If DB unreachable, prints Supabase SQL Editor link.
 */
import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import pg from 'pg';

config({ path: '.env' });
config({ path: '.env.local', override: true });

const url = process.env.DATABASE_URL;
const PROJECT = 'whzxyjzyxttffafqkmzv';

if (!url || url.includes('....') || url.includes('ŞİFREN')) {
  console.error('\n❌ DATABASE_URL geçersiz veya placeholder.');
  console.error('   .env.local dosyasında gerçek Supabase URI olmalı.\n');
  process.exit(1);
}

async function canConnect() {
  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: 12000,
    ssl: url.includes('pooler.supabase.com') ? { rejectUnauthorized: false } : undefined,
  });
  try {
    await client.connect();
    await client.query('SELECT 1');
    await client.end();
    return true;
  } catch (e) {
    try {
      await client.end();
    } catch {
      /* ignore */
    }
    console.error('\n⚠️  Veritabanına bağlanılamadı:', e.message);
    return false;
  }
}

async function main() {
  console.log('🔌 Bağlantı test ediliyor…');
  const ok = await canConnect();

  if (!ok) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Supabase panelden (terminal yok):

1. Şifreyi doğrula / sıfırla:
   https://supabase.com/dashboard/project/${PROJECT}/settings/database

2. Connect → Session pooler → URI kopyala
   Şifreyi yapıştır → .env ve .env.local içindeki DATABASE_URL güncelle

3. SQL Editor → New query → şu dosyanın içeriğini yapıştır → Run:
   prisma/supabase-init.sql
   prisma/supabase-seed-minimal.sql

4. Tekrar: npm run db:setup  (veya sadece npm run db:seed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    process.exit(1);
  }

  console.log('✅ Bağlantı OK — Prisma push + seed…\n');
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  console.log('\n🎉 Veritabanı hazır.\n');
}

main();

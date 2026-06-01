import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

config({ path: '.env' });
config({ path: '.env.local', override: true });

// Vercel build has no .env file — generate must not require a real database.
const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://build:build@127.0.0.1:5432/postgres?schema=public';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: databaseUrl,
  },
});

import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// .env.local overrides .env (Supabase credentials)
config({ path: '.env' });
config({ path: '.env.local', override: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});

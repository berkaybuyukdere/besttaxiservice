# Best Taxi Service

Premium airport transfer — Zürich (ZRH). Next.js 16, Prisma, Supabase PostgreSQL, next-intl (DE/EN/FR/IT).

## Local

```bash
npm install
cp .env.example .env.local   # DATABASE_URL + Supabase keys doldur
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/de`.

Admin demo: `/admin/login` — `admin@besttaxiservice.ch` / `admin123` (after seed).

## Deploy

See [DEPLOY.md](./DEPLOY.md) — Vercel + Supabase.

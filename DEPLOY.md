# Vercel + Supabase deploy

Proje: **Supabase PostgreSQL** (`whzxyjzyxttffafqkmzv`) + Prisma.

## 1. Supabase bağlantısı

1. [Supabase Dashboard](https://supabase.com/dashboard/project/whzxyjzyxttffafqkmzv/settings/database) → **Database password** (proje oluştururken verdiğin şifre).
2. **Connect** → **Session pooler** → URI kopyala (Vercel IPv4 için gerekli).
3. Vercel Environment Variables:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Session pooler URI (`postgres.whzxyjzyxttffafqkmzv:...@...pooler.supabase.com:5432/...`) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://whzxyjzyxttffafqkmzv.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Dashboard → API → publishable key |

Tablolar (bir kez, kendi bilgisayarında):

```bash
export DATABASE_URL="session-pooler-uri-buraya"
npx prisma db push
npm run db:seed
```

## Eski not — diğer sağlayıcılar

| Sağlayıcı | Ücretsiz | Not |
|-----------|----------|-----|
| [Supabase](https://supabase.com) | Evet | Bu proje için seçildi |
| [Railway](https://railway.app) | Sınırlı kredi | New Project → PostgreSQL → `DATABASE_URL` |
| [Vercel Postgres](https://vercel.com/storage) | Hobby limiti | Vercel projesine Storage ekle, otomatik env |
| [ElephantSQL](https://www.elephantsql.com) | Küçük plan | Tek connection string |

**Supabase örneği:** Settings → Database → “URI” kopyala. Serverless için bazen “Transaction pooler” (port 6543) daha iyidir; Prisma dokümantasyonuna göre `?pgbouncer=true` eklenebilir.

## 2. Tabloları oluştur (bir kez)

Kendi bilgisayarında, **production** connection string ile:

```bash
cd besttaxiservice
export DATABASE_URL="postgresql://..."   # sağlayıcından kopyaladığın URL
npx prisma db push
npm run db:seed   # isteğe bağlı — demo araçlar / admin
```

## 3. GitHub’a yükle

```bash
cd besttaxiservice
git add .
git commit -m "Prepare for Vercel deploy"
gh repo create besttaxiservice --private --source=. --push
```

(Repo zaten varsa: `git remote add origin ...` ve `git push -u origin main`)

## 4. Vercel’e bağla

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub repo’yu seç.
2. **Root Directory:** `besttaxiservice` (repo kökünde değilse).
3. **Environment Variables** ekle:

| Name | Value |
|------|--------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | `https://SENIN-PROJE.vercel.app` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` ile üret |
| `EMAIL_FROM` | `info@besttaxiservice.ch` |
| `ADMIN_EMAIL` | `admin@besttaxiservice.ch` |
| `RESEND_API_KEY` | (opsiyonel) |

4. **Deploy** — build: `prisma generate && next build` (`vercel.json` içinde).

## 5. CLI ile deploy (alternatif)

```bash
npm i -g vercel
vercel login
cd besttaxiservice
vercel link
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel --prod
```

## Link paylaşma

Deploy bitince: `https://besttaxiservice-xxx.vercel.app`  
Bu linki herkes açabilir. Sonra kendi domain’ini Vercel → Domains’ten bağlayabilirsin.

## Sorun giderme

- **Build hatası `DATABASE_URL`:** Vercel’de env tanımlı mı kontrol et (Production + Preview).
- **Sayfa açılıyor, booking/API hata:** `prisma db push` production DB’de çalıştırıldı mı?
- **E-posta gitmiyor:** `RESEND_API_KEY` boşsa normal; API yine çalışır.

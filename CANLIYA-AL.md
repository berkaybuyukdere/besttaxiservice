# Canlıya alma — 2 adım (5 dakika)

## Durum

| Parça | Durum |
|-------|--------|
| Uygulama kodu | ✅ GitHub’da |
| Vercel ayarları (`vercel.json`) | ✅ Hazır |
| Supabase SQL (tablolar + veri) | ✅ `prisma/supabase-all-in-one.sql` |
| **Canlı URL** | ❌ Vercel hesabına bağlanması lazım |
| **Veritabanı dolu** | ❌ Supabase SQL Editor’da bir kez Run |

---

## Adım 1 — Supabase (veritabanı)

1. https://supabase.com/dashboard/project/whzxyjzyxttffafqkmzv/sql/new  
2. `prisma/supabase-all-in-one.sql` dosyasının **tamamını** yapıştır → **Run**

---

## Adım 2 — Vercel (canlı site)

1. **Import:** https://vercel.com/new/import?s=https://github.com/berkaybuyukdere/besttaxiservice  
2. GitHub ile giriş → repo seç → **Deploy** öncesi **Environment Variables** (Production + Preview — **zorunlu**, yoksa build veya API hata verir):

```
DATABASE_URL = (Supabase → Connect → Session pooler URI, şifre: Berkay122300.)
NEXT_PUBLIC_SUPABASE_URL = https://whzxyjzyxttffafqkmzv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_publishable_MA714zmJV6Rm9lDuSEee3w_jcBa-WXU
NEXTAUTH_URL = https://SENIN-PROJE.vercel.app
NEXTAUTH_SECRET = viamV0ZkAXTeAmP6eVKBXeQFHHZk2PZ+TtR+FBPa++U=
EMAIL_FROM = info@besttaxiservice.ch
ADMIN_EMAIL = admin@besttaxiservice.ch
```

3. Deploy bitince link: `https://besttaxiservice.vercel.app` (veya benzeri)

4. `NEXTAUTH_URL` değerini gerçek URL ile güncelle → **Redeploy**

---

## Terminal istemiyorsan

Sadece yukarıdaki iki web adımı yeterli. `vercel login` yaparsan bir sonraki mesajda CLI ile de deploy edilebilir.

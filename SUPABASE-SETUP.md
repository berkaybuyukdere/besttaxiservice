# Supabase kurulumu (terminal yok)

Şifre veya pooler URI yanlışsa Prisma bağlanamaz. Aşağıdaki adımlar **sadece tarayıcı** ile çalışır.

## 1. Veritabanı şifresini doğrula

1. Aç: https://supabase.com/dashboard/project/whzxyjzyxttffafqkmzv/settings/database  
2. **Reset database password** → yeni şifre belirle (ör. `Berkay122300.`)  
3. **Connect** → **Session pooler** → URI kopyala  

`.env` ve `.env.local` içinde:

```
DATABASE_URL="buraya-yapistir"
```

## 2. Tabloları + veriyi oluştur (tek sefer)

1. Aç: https://supabase.com/dashboard/project/whzxyjzyxttffafqkmzv/sql/new  
2. Dosyayı aç: `prisma/supabase-all-in-one.sql`  
3. Tümünü kopyala → SQL Editor’a yapıştır → **Run**  

Bitti. Admin: `admin@besttaxiservice.ch` / `admin123`

## 3. Vercel

Vercel → Environment Variables → `DATABASE_URL` = Session pooler URI (aynı şifre).

Deploy sonrası site çalışır.

## Otomatik (şifre doğruysa)

```bash
npm run db:setup
```

Bu komut bağlanırsa Prisma push + seed yapar; bağlanamazsa yukarıdaki linkleri gösterir.

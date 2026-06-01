#!/usr/bin/env bash
# Run after: vercel login && cd besttaxiservice && vercel link
set -euo pipefail

echo "Vercel env setup — değerleri Supabase Dashboard'dan yapıştır."
echo ""

vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add EMAIL_FROM production
vercel env add ADMIN_EMAIL production

echo ""
echo "Preview için de aynı değişkenleri eklemek istersen her komutta Preview seç."
echo "Deploy: vercel --prod"

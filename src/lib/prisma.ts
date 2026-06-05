import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  if (url.includes('pooler.supabase.com') && !url.includes('sslmode=')) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}sslmode=require`;
  }
  return url;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: getDatabaseUrl() } },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

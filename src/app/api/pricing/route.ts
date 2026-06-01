import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRICING_DATA } from '@/lib/pricing-data';

export async function GET() {
  try {
    const pricing = await prisma.pricing.findMany({
      orderBy: [{ region: 'asc' }, { location: 'asc' }],
    });

    // If DB is empty, return static data
    if (pricing.length === 0) {
      return NextResponse.json(PRICING_DATA);
    }

    return NextResponse.json(pricing);
  } catch {
    // Fallback to static data if DB unavailable
    return NextResponse.json(PRICING_DATA);
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Besttaxiservice2026.';

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return false;
  const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
  const [user, pass] = decoded.split(':');
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Admin bookings fetch error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookingNumber, status } = await req.json();
    const booking = await prisma.booking.update({
      where: { bookingNumber },
      data: { status },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Admin booking update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const number = req.nextUrl.searchParams.get('number')?.trim().toUpperCase();

  if (!number) {
    return NextResponse.json({ error: 'Reservierungsnummer erforderlich' }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { bookingNumber: number },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Reservierung nicht gefunden' }, { status: 404 });
    }

    return NextResponse.json({
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      passengerName: booking.passengerName,
      pickupDate: booking.pickupDate,
      pickupTime: booking.pickupTime,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      vehicleType: booking.vehicleType,
      price: booking.price,
      isSameDay: booking.isSameDay,
    });
  } catch (error) {
    console.error('Booking lookup error:', error);
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }
}

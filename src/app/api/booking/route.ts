import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateBookingNumber, generateSecureToken, isToday } from '@/lib/utils';
import { sendMail, bookingAdminEmailHtml, bookingCustomerEmailHtml } from '@/lib/email';

const bookingSchema = z.object({
  pickupDate: z.string(),
  pickupTime: z.string(),
  pickupLocation: z.string().min(1),
  dropoffLocation: z.string().min(1),
  vehicleType: z.enum(['BUSINESS_FAMILY', 'VIP_ULTRA_COMFORT', 'PREMIUM_CLASS']),
  vehicleLabel: z.string().optional(),
  passengerName: z.string().min(1),
  passengerEmail: z.string().email(),
  passengerPhone: z.string().min(1),
  flightNumber: z.string().optional(),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(['CARD', 'CASH', 'INVOICE']),
  price: z.number().positive(),
});

async function uniqueBookingNumber(): Promise<string> {
  for (let i = 0; i < 10; i++) {
    const num = generateBookingNumber();
    const existing = await prisma.booking.findUnique({ where: { bookingNumber: num } });
    if (!existing) return num;
  }
  return `RES-${Date.now().toString().slice(-5)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const pickupDate = new Date(data.pickupDate);
    const sameDayBooking = isToday(pickupDate);
    const bookingNumber = await uniqueBookingNumber();
    const approvalToken = sameDayBooking ? generateSecureToken() : null;
    const tokenExpiry = sameDayBooking ? new Date(Date.now() + 3600 * 1000) : null;

    const vehicleNote = data.vehicleLabel ? `[Fahrzeug: ${data.vehicleLabel}]` : '';
    const specialRequests = [vehicleNote, data.specialRequests].filter(Boolean).join(' ').trim() || null;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        status: sameDayBooking ? 'PENDING' : 'CONFIRMED',
        pickupDate,
        pickupTime: data.pickupTime,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        vehicleType: data.vehicleType,
        passengerName: data.passengerName,
        passengerEmail: data.passengerEmail,
        passengerPhone: data.passengerPhone,
        flightNumber: data.flightNumber,
        specialRequests,
        price: data.price,
        isSameDay: sameDayBooking,
        paymentMethod: data.paymentMethod,
        approvalToken,
        approvalTokenExpiresAt: tokenExpiry,
      },
    });

    sendBookingEmails(booking).catch(console.error);

    return NextResponse.json({
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      isSameDay: sameDayBooking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendBookingEmails(booking: {
  bookingNumber: string;
  status: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  pickupDate: Date;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  price: number;
  paymentMethod: string;
  flightNumber: string | null;
  specialRequests: string | null;
}) {
  const adminEmail = process.env.GMAIL_USER || process.env.ADMIN_EMAIL || 'contactbuyukdere@gmail.com';

  await sendMail({
    to: adminEmail,
    subject: `Neue Reservierung ${booking.bookingNumber}`,
    html: bookingAdminEmailHtml(booking),
    replyTo: booking.passengerEmail,
  });

  await sendMail({
    to: booking.passengerEmail,
    subject: `Reservierung ${booking.bookingNumber} — Best Taxi Service`,
    html: bookingCustomerEmailHtml(booking),
  });
}

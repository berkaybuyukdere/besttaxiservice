import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateBookingNumber, generateSecureToken, isToday } from '@/lib/utils';

const bookingSchema = z.object({
  pickupDate: z.string(),
  pickupTime: z.string(),
  pickupLocation: z.string().min(1),
  dropoffLocation: z.string().min(1),
  vehicleType: z.enum(['BUSINESS_FAMILY', 'VIP_ULTRA_COMFORT', 'PREMIUM_CLASS']),
  passengerName: z.string().min(1),
  passengerEmail: z.string().email(),
  passengerPhone: z.string().min(1),
  flightNumber: z.string().optional(),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(['CARD', 'CASH', 'INVOICE']),
  price: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const pickupDate = new Date(data.pickupDate);
    const sameDayBooking = isToday(pickupDate);
    const bookingNumber = generateBookingNumber();
    const approvalToken = sameDayBooking ? generateSecureToken() : null;
    const tokenExpiry = sameDayBooking ? new Date(Date.now() + 3600 * 1000) : null;

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
        specialRequests: data.specialRequests,
        price: data.price,
        isSameDay: sameDayBooking,
        paymentMethod: data.paymentMethod,
        approvalToken,
        approvalTokenExpiresAt: tokenExpiry,
      },
    });

    // Send emails (fire and forget)
    sendEmails(booking, sameDayBooking, approvalToken).catch(console.error);

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

async function sendEmails(
  booking: { bookingNumber: string; passengerEmail: string; passengerName: string; pickupDate: Date; pickupTime: string; pickupLocation: string; dropoffLocation: string; vehicleType: string; price: number; isSameDay: boolean },
  isSameDay: boolean,
  approvalToken: string | null
) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@besttaxiservice.ch';
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // Only send if RESEND_API_KEY or SMTP is configured
  if (!process.env.RESEND_API_KEY) return;

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (isSameDay && approvalToken) {
    // Admin urgent email
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
      to: adminEmail,
      subject: `🔴 DRINGEND: Gleichtag-Buchung #${booking.bookingNumber} – Bestätigung erforderlich`,
      html: `
        <h2>Neue Gleichtag-Buchung!</h2>
        <p><strong>Buchungs-ID:</strong> ${booking.bookingNumber}</p>
        <p><strong>Kunde:</strong> ${booking.passengerName}</p>
        <p><strong>E-Mail:</strong> ${booking.passengerEmail}</p>
        <p><strong>Datum:</strong> ${booking.pickupDate.toLocaleDateString('de-CH')}</p>
        <p><strong>Zeit:</strong> ${booking.pickupTime}</p>
        <p><strong>Von:</strong> ${booking.pickupLocation}</p>
        <p><strong>Nach:</strong> ${booking.dropoffLocation}</p>
        <p><strong>Fahrzeug:</strong> ${booking.vehicleType}</p>
        <p><strong>Preis:</strong> CHF ${booking.price}</p>
        <br/>
        <a href="${baseUrl}/api/booking/approve?token=${approvalToken}&action=confirm" style="background:#16a34a;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;margin-right:10px">✅ Bestätigen</a>
        <a href="${baseUrl}/api/booking/approve?token=${approvalToken}&action=reject" style="background:#dc2626;color:white;padding:12px 24px;text-decoration:none;border-radius:6px">❌ Ablehnen</a>
      `,
    });

    // Customer pending email
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
      to: booking.passengerEmail,
      subject: `Ihre Buchung #${booking.bookingNumber} wurde empfangen – Best Taxi Service`,
      html: `
        <h2>Buchung erhalten!</h2>
        <p>Guten Tag ${booking.passengerName},</p>
        <p>Ihre Buchungsanfrage wurde empfangen. Da es sich um eine Gleichtag-Buchung handelt, wird Ihre Buchung derzeit von unserem Team geprüft. Sie erhalten binnen 30 Minuten eine Bestätigung.</p>
        <p><strong>Buchungs-ID:</strong> ${booking.bookingNumber}</p>
        <p><strong>Datum:</strong> ${booking.pickupDate.toLocaleDateString('de-CH')} um ${booking.pickupTime}</p>
        <p><strong>Von:</strong> ${booking.pickupLocation}</p>
        <p><strong>Nach:</strong> ${booking.dropoffLocation}</p>
        <p><strong>Preis:</strong> CHF ${booking.price} (Fixpreis)</p>
        <br/>
        <p>Mit freundlichen Grüssen,<br/>Best Taxi Service<br/>+41 76 302 03 26</p>
      `,
    });
  } else {
    // Confirmed booking email
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
      to: booking.passengerEmail,
      subject: `✅ Buchung #${booking.bookingNumber} bestätigt – Best Taxi Service`,
      html: `
        <h2>Buchung bestätigt!</h2>
        <p>Guten Tag ${booking.passengerName},</p>
        <p>Ihre Buchung wurde erfolgreich bestätigt.</p>
        <p><strong>Buchungs-ID:</strong> ${booking.bookingNumber}</p>
        <p><strong>Datum:</strong> ${booking.pickupDate.toLocaleDateString('de-CH')} um ${booking.pickupTime}</p>
        <p><strong>Von:</strong> ${booking.pickupLocation}</p>
        <p><strong>Nach:</strong> ${booking.dropoffLocation}</p>
        <p><strong>Fahrzeug:</strong> ${booking.vehicleType}</p>
        <p><strong>Preis:</strong> CHF ${booking.price} (Fixpreis)</p>
        <br/>
        <p>Mit freundlichen Grüssen,<br/>Best Taxi Service<br/>+41 76 302 03 26</p>
      `,
    });

    // Admin notification
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
      to: adminEmail,
      subject: `Neue Buchung #${booking.bookingNumber}`,
      html: `
        <h2>Neue Buchung eingegangen</h2>
        <p><strong>ID:</strong> ${booking.bookingNumber}</p>
        <p><strong>Kunde:</strong> ${booking.passengerName} (${booking.passengerEmail})</p>
        <p><strong>Datum:</strong> ${booking.pickupDate.toLocaleDateString('de-CH')} um ${booking.pickupTime}</p>
        <p><strong>Route:</strong> ${booking.pickupLocation} → ${booking.dropoffLocation}</p>
        <p><strong>Preis:</strong> CHF ${booking.price}</p>
        <a href="${baseUrl}/admin/bookings">Im Admin Panel anzeigen</a>
      `,
    });
  }
}

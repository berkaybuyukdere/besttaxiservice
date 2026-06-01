import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action');

  if (!token || !action || !['confirm', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { approvalToken: token },
  });

  if (!booking) {
    return new Response(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px"><h2>❌ Ungültiger oder abgelaufener Link</h2></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (booking.approvalTokenExpiresAt && booking.approvalTokenExpiresAt < new Date()) {
    return new Response(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px"><h2>⏰ Link ist abgelaufen</h2></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (booking.status !== 'PENDING') {
    return new Response(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px"><h2>ℹ️ Buchung wurde bereits bearbeitet (${booking.status})</h2></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const newStatus = action === 'confirm' ? 'CONFIRMED' : 'CANCELLED';

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: newStatus,
      approvalToken: null,
      approvalTokenExpiresAt: null,
    },
  });

  // Send customer email notification
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (action === 'confirm') {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
          to: booking.passengerEmail,
          subject: `✅ Buchung #${booking.bookingNumber} bestätigt – Best Taxi Service`,
          html: `<h2>Ihre Buchung wurde bestätigt!</h2><p>Buchungs-ID: ${booking.bookingNumber}</p><p>Unser Fahrer wird pünktlich bei Ihnen sein.</p>`,
        });
      } else {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'info@besttaxiservice.ch',
          to: booking.passengerEmail,
          subject: `Buchung #${booking.bookingNumber} – Leider nicht verfügbar`,
          html: `<h2>Leider nicht verfügbar</h2><p>Für Ihren gewünschten Termin konnten wir leider keinen Fahrer bereitstellen. Bitte kontaktieren Sie uns: +41 76 302 03 26</p>`,
        });
      }
    } catch (e) {
      console.error('Email send error:', e);
    }
  }

  return new Response(
    `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f9f9f7">
      <div style="max-width:400px;margin:0 auto;background:white;padding:32px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <h2 style="color:${action === 'confirm' ? '#16a34a' : '#dc2626'}">${action === 'confirm' ? '✅ Buchung bestätigt' : '❌ Buchung abgelehnt'}</h2>
        <p>Buchungs-ID: <strong>${booking.bookingNumber}</strong></p>
        <p style="color:#666">Dem Kunden wurde eine E-Mail gesendet.</p>
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/bookings" style="display:inline-block;margin-top:16px;background:#D85A30;color:white;padding:10px 20px;text-decoration:none;border-radius:8px">Admin Panel öffnen</a>
      </div>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

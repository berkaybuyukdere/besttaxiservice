import nodemailer from 'nodemailer';

function getGmailPassword() {
  return (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').replace(/\s/g, '');
}

function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = getGmailPassword();

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendMail(options: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.error('Email not configured — set GMAIL_USER and GMAIL_APP_PASSWORD on Vercel');
    throw new Error('Email not configured');
  }

  const from = process.env.EMAIL_FROM || process.env.GMAIL_USER || 'contactbuyukdere@gmail.com';

  await transporter.sendMail({
    from: `Best Taxi Service <${from}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  return true;
}

export function bookingAdminEmailHtml(booking: {
  bookingNumber: string;
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
  flightNumber?: string | null;
  specialRequests?: string | null;
  status: string;
}) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#1a1a1a;color:#e5e5e5;padding:32px;border-radius:12px">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px">Neue Reservierung</p>
      <h1 style="color:#fff;font-size:22px;margin:0 0 24px">${booking.bookingNumber}</h1>
      <table style="width:100%;font-size:14px;line-height:1.8">
        <tr><td style="color:#888">Status</td><td><strong>${booking.status}</strong></td></tr>
        <tr><td style="color:#888">Kunde</td><td>${booking.passengerName}</td></tr>
        <tr><td style="color:#888">E-Mail</td><td>${booking.passengerEmail}</td></tr>
        <tr><td style="color:#888">Telefon</td><td>${booking.passengerPhone}</td></tr>
        <tr><td style="color:#888">Datum</td><td>${booking.pickupDate.toLocaleDateString('de-CH')} · ${booking.pickupTime}</td></tr>
        <tr><td style="color:#888">Route</td><td>${booking.pickupLocation} → ${booking.dropoffLocation}</td></tr>
        <tr><td style="color:#888">Fahrzeug</td><td>${booking.vehicleType}</td></tr>
        <tr><td style="color:#888">Preis</td><td><strong style="color:#C9A84C">CHF ${booking.price}</strong></td></tr>
        <tr><td style="color:#888">Zahlung</td><td>${booking.paymentMethod}</td></tr>
        ${booking.flightNumber ? `<tr><td style="color:#888">Flug</td><td>${booking.flightNumber}</td></tr>` : ''}
        ${booking.specialRequests ? `<tr><td style="color:#888">Notiz</td><td>${booking.specialRequests}</td></tr>` : ''}
      </table>
    </div>
  `;
}

export function bookingCustomerEmailHtml(booking: {
  bookingNumber: string;
  passengerName: string;
  pickupDate: Date;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  price: number;
  status: string;
}) {
  const confirmed = booking.status === 'CONFIRMED';
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#1a1a1a;color:#e5e5e5;padding:32px;border-radius:12px">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px">Best Taxi Service</p>
      <h1 style="color:#fff;font-size:22px;margin:0 0 8px">${confirmed ? 'Reservierung bestätigt' : 'Reservierung eingegangen'}</h1>
      <p style="color:#aaa;margin:0 0 24px">Guten Tag ${booking.passengerName},</p>
      <p style="font-size:28px;font-weight:bold;color:#C9A84C;margin:0 0 24px;letter-spacing:0.05em">${booking.bookingNumber}</p>
      <table style="width:100%;font-size:14px;line-height:1.8">
        <tr><td style="color:#888">Datum</td><td>${booking.pickupDate.toLocaleDateString('de-CH')} · ${booking.pickupTime}</td></tr>
        <tr><td style="color:#888">Abholung</td><td>${booking.pickupLocation}</td></tr>
        <tr><td style="color:#888">Ziel</td><td>${booking.dropoffLocation}</td></tr>
        <tr><td style="color:#888">Fixpreis</td><td><strong style="color:#C9A84C">CHF ${booking.price}</strong></td></tr>
      </table>
      <p style="margin-top:24px;color:#888;font-size:13px">Mit freundlichen Grüssen<br/>Best Taxi Service · +41 76 302 03 26</p>
    </div>
  `;
}

export function contactFormEmailHtml(data: { name: string; email: string; message: string }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#1a1a1a;color:#e5e5e5;padding:32px;border-radius:12px">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px">Kontaktformular</p>
      <h1 style="color:#fff;font-size:20px;margin:0 0 24px">Neue Nachricht</h1>
      <p><strong style="color:#888">Name:</strong> ${data.name}</p>
      <p><strong style="color:#888">E-Mail:</strong> ${data.email}</p>
      <p style="margin-top:16px"><strong style="color:#888">Nachricht:</strong></p>
      <p style="white-space:pre-wrap;line-height:1.6">${data.message}</p>
    </div>
  `;
}

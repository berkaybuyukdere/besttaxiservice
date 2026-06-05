import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail, contactFormEmailHtml } from '@/lib/email';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const adminEmail = process.env.GMAIL_USER || process.env.ADMIN_EMAIL || 'contactbuyukdere@gmail.com';

    await sendMail({
      to: adminEmail,
      subject: `Kontaktanfrage — ${data.name}`,
      html: contactFormEmailHtml(data),
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 });
    }
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Senden fehlgeschlagen' }, { status: 500 });
  }
}

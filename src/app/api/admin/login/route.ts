import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Besttaxiservice2026.';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Ungültige Anmeldedaten' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle2, Clock, Home, Phone, Mail, ArrowRight } from 'lucide-react';

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const bookingId = searchParams.get('id') || '';

  return (
    <div className="lux-confirmation-page">
      <div className="lux-confirmation-card">
        <div className="lux-confirmation-icon">
          <CheckCircle2 size={36} strokeWidth={1.5} />
        </div>

        <p className="micro lux-gold mb-2">Schritt 4 · Bestätigung</p>
        <h1>Buchung erhalten!</h1>
        <p className="lux-confirmation-lead">
          Ihre Anfrage wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigungs-E-Mail
          an Ihre angegebene Adresse.
        </p>

        {bookingId && (
          <div className="lux-confirmation-id">
            <span className="label">Ihre Buchungs-ID</span>
            <strong>{bookingId}</strong>
            <span className="hint">Bitte für Rückfragen und Statusabfrage bereithalten.</span>
          </div>
        )}

        <div className="lux-confirmation-steps">
          <div className="steps-head">
            <Clock size={16} />
            <span>Nächste Schritte</span>
          </div>
          <ul>
            <li>Bestätigungs-E-Mail im Posteingang prüfen (auch Spam-Ordner)</li>
            <li>Bei Gleichtag-Buchung: Admin-Bestätigung innerhalb von 30 Minuten</li>
            <li>Fahrerdetails werden spätestens 24h vor Abfahrt mitgeteilt</li>
          </ul>
        </div>

        <div className="lux-confirmation-actions">
          <Link href={`/${locale}`} className="btn-ghost-lux no-underline">
            <Home size={14} /> Zur Startseite
          </Link>
          <a href="tel:+41763020326" className="btn-accent no-underline">
            <Phone size={14} /> +41 76 302 03 26
          </a>
        </div>

        <p className="lux-confirmation-foot">
          <Mail size={12} /> Keine E-Mail erhalten?{' '}
          <a href="mailto:info@besttaxiservice.ch">info@besttaxiservice.ch</a>
          {' · '}
          <Link href={`/${locale}/booking/status?number=${encodeURIComponent(bookingId)}`}>
            Status prüfen <ArrowRight size={12} />
          </Link>
        </p>
      </div>
    </div>
  );
}

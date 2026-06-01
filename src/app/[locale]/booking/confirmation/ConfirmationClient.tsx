'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle, Clock, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const bookingId = searchParams.get('id') || '';

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[rgba(216,90,48,0.1)] flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} color="#D85A30" />
      </div>

      <h1 className="text-[26px] font-medium mb-3">Buchung erhalten!</h1>
      <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
        Ihre Buchungsanfrage wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigungs-E-Mail.
      </p>

      {bookingId && (
        <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] rounded-[12px] p-5 mb-6">
          <div className="text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Ihre Buchungs-ID</div>
          <div className="text-[22px] font-medium text-[#D85A30] font-mono">{bookingId}</div>
          <div className="text-[11px] text-[var(--color-text-secondary)] mt-1">Bitte bewahren Sie diese ID für Ihre Unterlagen auf.</div>
        </div>
      )}

      <div className="bg-[var(--color-warning-bg)] border border-[var(--color-warning)] rounded-[12px] p-4 mb-8 text-left">
        <div className="flex items-start gap-2">
          <Clock size={15} className="text-[#854F0B] shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] font-medium text-[#854F0B] mb-1">Nächste Schritte</div>
            <ul className="text-[12px] text-[#854F0B] space-y-1 list-disc list-inside">
              <li>Bestätigungs-E-Mail prüfen</li>
              <li>Bei Gleichtag-Buchung: Admin-Bestätigung abwarten (max. 30 Min.)</li>
              <li>Fahrerdaten werden 24h vor Abfahrt mitgeteilt</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/${locale}`} className="flex-1">
          <Button variant="outline" className="w-full gap-1.5">
            <Home size={14} /> Zur Startseite
          </Button>
        </Link>
        <a href="tel:+41763020326" className="flex-1">
          <Button className="w-full gap-1.5">
            <Phone size={14} /> +41 76 302 03 26
          </Button>
        </a>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import PageShell from '@/components/layout/PageShell';

const STATUS: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'In Bearbeitung', className: 'status-pending' },
  CONFIRMED: { label: 'Bestätigt', className: 'status-confirmed' },
  CANCELLED: { label: 'Storniert', className: 'status-cancelled' },
  COMPLETED: { label: 'Abgeschlossen', className: 'status-completed' },
};

type BookingData = {
  bookingNumber: string;
  status: string;
  passengerName: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  price: number;
};

export default function BookingStatusClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const number = searchParams.get('number') || '';
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!number) {
      setError('Keine Reservierungsnummer');
      return;
    }
    fetch(`/api/booking/lookup?number=${encodeURIComponent(number)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setBooking(data);
      })
      .catch(() => setError('Fehler beim Laden'));
  }, [number]);

  return (
    <PageShell>
      <section className="lux-page section">
        <div className="lux-status-card">
          <p className="micro lux-gold mb-3">Reservierung prüfen</p>
          {error && <p className="lux-error">{error}</p>}
          {!error && !booking && <p className="text-gray-400">Wird geladen…</p>}
          {booking && (
            <>
              <h1 className="lux-status-number">{booking.bookingNumber}</h1>
              <span className={`lux-status-badge ${STATUS[booking.status]?.className || ''}`}>
                {STATUS[booking.status]?.label || booking.status}
              </span>
              <div className="lux-status-grid">
                <div>
                  <span className="label">Kunde</span>
                  <strong>{booking.passengerName}</strong>
                </div>
                <div>
                  <span className="label">Datum & Zeit</span>
                  <strong>
                    {new Date(booking.pickupDate).toLocaleDateString('de-CH')} · {booking.pickupTime}
                  </strong>
                </div>
                <div>
                  <span className="label">Route</span>
                  <strong>
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </strong>
                </div>
                <div>
                  <span className="label">Fixpreis</span>
                  <strong className="lux-gold">CHF {booking.price}</strong>
                </div>
              </div>
            </>
          )}
          <Link href={`/${locale}`} className="btn-accent no-underline inline-flex mt-8">
            Neue Buchung
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

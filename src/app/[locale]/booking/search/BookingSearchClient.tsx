'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { FLEET_VEHICLES } from '@/lib/fleet-data';
import PageShell from '@/components/layout/PageShell';

export default function BookingSearchClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const from = searchParams.get('from') || 'Zürich Flughafen (ZRH)';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const basePrice = parseFloat(searchParams.get('price') || '70');

  const handleSelect = (vehicleId: string, vehicleType: string, price: number, label: string) => {
    const params = new URLSearchParams({
      from,
      to,
      date,
      time,
      vehicle: vehicleType,
      vehicleId,
      vehicleLabel: label,
      price: price.toString(),
    });
    router.push(`/${locale}/booking/passenger-details?${params.toString()}`);
  };

  return (
    <PageShell>
      <div className="lux-booking-page">
        <div className="booking-steps">
          <span className="step active">1. Suche</span>
          <ArrowRight size={14} />
          <span className="step">2. Fahrzeug</span>
          <ArrowRight size={14} />
          <span className="step">3. Details</span>
          <ArrowRight size={14} />
          <span className="step">4. Bestätigung</span>
        </div>

        <div className="lux-trip-summary">
          <h2>Ihre Reise</h2>
          <div className="trip-grid">
            <div><span>Von</span><strong>{from}</strong></div>
            <div><span>Nach</span><strong>{to || '—'}</strong></div>
            <div><span>Datum</span><strong>{date || '—'} · {time || '08:00'}</strong></div>
          </div>
        </div>

        <h2 className="lux-section-title">Fahrzeug wählen</h2>
        <div className="vehicle-list-lux">
          {FLEET_VEHICLES.map((v) => {
            const price = Math.round(basePrice * v.multiplier);
            return (
              <div key={v.id} className={`vehicle-row-lux${v.recommended ? ' featured' : ''}`}>
                {v.recommended && <span className="vehicle-badge-lux">Empfohlen</span>}
                <div className="vehicle-img-lux">
                  <Image src={v.image} alt={v.name} fill style={{ objectFit: 'cover' }} sizes="200px" />
                </div>
                <div className="vehicle-info-lux">
                  <h3>{v.name}</h3>
                  <p className="model">{v.model}</p>
                  <p className="desc">{v.description}</p>
                  <p className="specs">{v.capacity} Passagiere · {v.luggage} Gepäck</p>
                </div>
                <div className="vehicle-price-lux">
                  <span className="label">Fixpreis</span>
                  <span className="price">CHF {price}</span>
                  <button type="button" className="btn-select-lux" onClick={() => handleSelect(v.id, v.vehicleType, price, v.name)}>
                    Auswählen <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

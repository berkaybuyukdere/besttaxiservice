'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VEHICLES = [
  {
    id: 'BUSINESS_FAMILY',
    name: 'Business & Family Class',
    model: 'Mercedes Benz V-Class',
    capacity: 7,
    luggage: 7,
    multiplier: 1.0,
    icon: '🚐',
    description: 'Ideal für Familien und Gruppen. Großzügig, komfortabel, mit viel Platz für Gepäck.',
  },
  {
    id: 'VIP_ULTRA_COMFORT',
    name: 'VIP Ultra Comfort',
    model: 'Mercedes Benz V300 Maybach',
    capacity: 5,
    luggage: 5,
    multiplier: 1.3,
    icon: '🚙',
    description: 'Das ultimative Reiseerlebnis. Luxus pur mit Massagesitzen und Premium-Ausstattung.',
    recommended: true,
  },
  {
    id: 'PREMIUM_CLASS',
    name: 'Premium Class',
    model: 'Mercedes Benz S-Class',
    capacity: 3,
    luggage: 3,
    multiplier: 1.5,
    icon: '🚗',
    description: 'Eleganz und Komfort für anspruchsvolle Geschäftsreisende.',
  },
];

export default function BookingSearchClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const basePrice = parseFloat(searchParams.get('price') || '70');

  const handleSelect = (vehicleId: string, price: number) => {
    const params = new URLSearchParams({
      from,
      to,
      date,
      time,
      vehicle: vehicleId,
      price: price.toString(),
    });
    router.push(`/${locale}/booking/passenger-details?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className="text-[#D85A30] font-medium">1. Suche</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">2. Fahrzeug</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">3. Details</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">4. Bestätigung</span>
      </div>

      {/* Route summary */}
      <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-5 mb-6">
        <h2 className="text-[16px] font-medium mb-4">Ihre Reise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-[#D85A30] mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-0.5">Von</div>
              <div className="text-[13px] font-medium">{from || 'Zürich Flughafen'}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-[var(--color-text-secondary)] mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-0.5">Nach</div>
              <div className="text-[13px] font-medium">{to || 'Ihr Ziel'}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar size={14} className="text-[var(--color-text-secondary)] mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-0.5">Datum & Zeit</div>
              <div className="text-[13px] font-medium flex items-center gap-1.5">
                {date || 'Heute'} <Clock size={12} /> {time || '08:00'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle selection */}
      <h2 className="text-[20px] font-medium mb-4">Fahrzeug wählen</h2>
      <div className="space-y-3">
        {VEHICLES.map((v) => {
          const price = Math.round(basePrice * v.multiplier);
          return (
            <div
              key={v.id}
              className={`bg-white border rounded-[14px] p-5 flex flex-col sm:flex-row gap-4 hover:border-[var(--color-border-secondary)] hover:shadow-sm transition-all relative ${
                v.recommended ? 'border-[#D85A30]' : 'border-[var(--color-border-tertiary)]'
              }`}
            >
              {v.recommended && (
                <div className="absolute -top-2.5 left-4 bg-[#D85A30] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  EMPFOHLEN
                </div>
              )}
              <div className="flex items-center gap-4 flex-1">
                <div className="text-[48px] shrink-0">{v.icon}</div>
                <div>
                  <div className="font-medium text-[15px]">{v.name}</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)] mb-1">{v.model}</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)] mb-2">
                    👥 {v.capacity} Passagiere · 🧳 {v.luggage} Gepäck
                  </div>
                  <p className="text-[12px] text-[var(--color-text-secondary)]">{v.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between sm:min-w-[140px]">
                <div className="text-right">
                  <div className="text-[11px] text-[var(--color-text-secondary)]">Fixpreis</div>
                  <div className="text-[24px] font-medium text-[#D85A30]">CHF {price}</div>
                </div>
                <Button onClick={() => handleSelect(v.id, price)} className="gap-1 mt-3 sm:mt-0">
                  Auswählen <ArrowRight size={13} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

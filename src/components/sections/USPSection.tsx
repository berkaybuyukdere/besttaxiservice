'use client';

import { useTranslations } from 'next-intl';
import { Tag, Baby, Plane, Clock, Users, CreditCard } from 'lucide-react';

const USPS = [
  { icon: Tag, nameKey: 'fixedPrice', descKey: 'fixedPriceDesc', color: '#F5C518' },
  { icon: Baby, nameKey: 'childSeat', descKey: 'childSeatDesc', color: '#22c55e' },
  { icon: Plane, nameKey: 'flightTracking', descKey: 'flightTrackingDesc', color: '#3b82f6' },
  { icon: Clock, nameKey: 'available', descKey: 'availableDesc', color: '#a855f7' },
  { icon: Users, nameKey: 'drivers', descKey: 'driversDesc', color: '#06b6d4' },
  { icon: CreditCard, nameKey: 'payment', descKey: 'paymentDesc', color: '#eab308' },
] as const;

export default function USPSection() {
  const t = useTranslations('usps');

  return (
    <div className="section-gray">
      <section className="section text-center" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p className="micro mb-3 text-[var(--accent-dark)]">Vorteile</p>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-sub mx-auto max-w-lg">{t('subtitle')}</p>

        <div className="usps-grid">
          {USPS.map(({ icon: Icon, nameKey, descKey, color }) => (
            <div key={nameKey} className="usp-card">
              <div
                className="service-hero-icon mb-4"
                style={{ background: `${color}18`, color, width: 48, height: 48 }}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-base mb-2 tracking-tight">
                {t(nameKey)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import { FLEET_VEHICLES } from '@/lib/fleet-data';

type FleetSectionProps = {
  fullPage?: boolean;
};

export default function FleetSection({ fullPage = false }: FleetSectionProps) {
  const t = useTranslations('fleet');
  const locale = useLocale();

  return (
    <section className={fullPage ? 'lux-fleet-page' : 'lux-section-dark'}>
      <div className="fleet-section">
        <header className="fleet-section-header">
          <p className="micro lux-gold mb-3">Premium Flotte</p>
          <h2 className="heading-xl text-white">{t('title')}</h2>
          <p className="lead text-gray-400">{t('subtitle')}</p>
        </header>

        <div className="fleet-grid-lux">
          {FLEET_VEHICLES.map((v) => (
            <article key={v.id} className={`fleet-card-lux${v.recommended ? ' featured' : ''}`}>
              {v.recommended && <span className="fleet-badge-lux">{t('recommended')}</span>}
              <div className="fleet-photo-lux">
                <Image src={v.image} alt={v.name} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className="fleet-body-lux">
                <h3 className="fleet-name-lux">{v.name}</h3>
                <p className="fleet-model-lux">{v.model}</p>
                <p className="fleet-desc-lux">{v.description}</p>
                <div className="fleet-specs-row">
                  <span className="fleet-spec-item">
                    <Users size={13} strokeWidth={2} />
                    {v.capacity} {t('passengers')}
                  </span>
                  <span className="fleet-spec-item">
                    <Briefcase size={13} strokeWidth={2} />
                    {v.luggage} {t('luggage')}
                  </span>
                </div>
                <div className="fleet-price-row">
                  <span className="from">{t('from')}</span>
                  <span className="amount">
                    {v.startPrice}
                    <span>CHF</span>
                  </span>
                </div>
                <Link href={`/${locale}/booking/search?vehicle=${v.id}`} className="fleet-cta-lux">
                  {t('bookNow')}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!fullPage && (
          <div className="text-center" style={{ marginTop: 48 }}>
            <Link href={`/${locale}/unsere-flotte`} className="btn-accent no-underline inline-flex items-center gap-2">
              {t('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

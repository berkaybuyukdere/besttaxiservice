'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

const VEHICLES = [
  {
    id: 'business',
    nameKey: 'business',
    modelKey: 'businessModel',
    capacity: 7,
    luggage: 7,
    startPrice: 70,
    image: '/images/besttaxi.png',
    recommended: false,
  },
  {
    id: 'vip',
    nameKey: 'vip',
    modelKey: 'vipModel',
    capacity: 5,
    luggage: 5,
    startPrice: 90,
    image: '/images/beststaxi2.png',
    recommended: true,
  },
  {
    id: 'premium',
    nameKey: 'premium',
    modelKey: 'premiumModel',
    capacity: 3,
    luggage: 3,
    startPrice: 110,
    image: '/images/besttaxi.png',
    recommended: false,
  },
] as const;

type FleetSectionProps = {
  fullPage?: boolean;
};

export default function FleetSection({ fullPage = false }: FleetSectionProps) {
  const t = useTranslations('fleet');
  const locale = useLocale();

  return (
    <section className={fullPage ? '' : 'section-gray'}>
      <div className="fleet-section">
        <header className="fleet-section-header">
          <p className="micro mb-3 text-[var(--accent-dark)]">Premium Flotte</p>
          <h2 className="heading-xl">{t('title')}</h2>
          <p className="lead">{t('subtitle')}</p>
        </header>

        <div className="fleet-grid">
          {VEHICLES.map((v) => (
            <article
              key={v.id}
              className={`fleet-card-v2${v.recommended ? ' is-featured' : ''}`}
            >
              {v.recommended && <span className="fleet-badge">{t('recommended')}</span>}
              <div className="fleet-photo">
                <Image
                  src={v.image}
                  alt={t(v.nameKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="fleet-body">
                <h3 className="fleet-name">{t(v.nameKey)}</h3>
                <p className="fleet-model">{t(v.modelKey)}</p>
                <div className="fleet-specs-row">
                  <span className="fleet-spec-item">
                    <Users size={14} strokeWidth={2.5} />
                    {v.capacity} {t('passengers')}
                  </span>
                  <span className="fleet-spec-item">
                    <Briefcase size={14} strokeWidth={2.5} />
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
                <Link
                  href={`/${locale}/booking/search?vehicle=${v.id}`}
                  className="fleet-cta"
                >
                  {t('bookNow')}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!fullPage && (
          <div className="text-center" style={{ marginTop: 48 }}>
            <Link
              href={`/${locale}/unsere-flotte`}
              className="btn-accent no-underline inline-flex items-center gap-2"
            >
              {t('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Percent, ArrowRight } from 'lucide-react';

const ROUTES = [
  { to: 'Zug', slug: 'zug', km: 46, duration: '55 min', type: 'Taxi', price: 138.69, oldPrice: 176, discount: 21 },
  { to: 'Luzern', slug: 'luzern', km: 63, duration: '1h 16m', type: 'Taxi', price: 189.75, oldPrice: 241, discount: 21 },
  { to: 'Basel', slug: 'basel', km: 86, duration: '1h 43m', type: 'Taxi', price: 258.5, oldPrice: 328, discount: 21 },
  { to: 'Davos', slug: 'davos', km: 150, duration: '2h 20m', type: 'Van', price: 600, oldPrice: null, discount: null },
  { to: 'St. Moritz', slug: 'st-moritz', km: 185, duration: '2h 45m', type: 'Van', price: 750, oldPrice: null, discount: null },
  { to: 'Bern', slug: 'bern', km: 125, duration: '1h 50m', type: 'Taxi', price: 500, oldPrice: 620, discount: 19 },
];

export default function RoutesSection() {
  const t = useTranslations('routes');
  const locale = useLocale();

  return (
    <section className="routes-showcase">
      <div className="routes-showcase-inner">
        <p className="micro mb-3" style={{ color: 'var(--accent)' }}>
          Fixpreise · Keine Überraschungen
        </p>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-sub">{t('subtitle')}</p>

        <div className="routes-grid-modern">
          {ROUTES.map((route) => (
            <Link
              key={route.slug}
              href={`/${locale}/routen/zuerich-flughafen-${route.slug}`}
              className="route-card-modern"
            >
              {route.discount != null && (
                <span className="route-discount-badge">
                  <Percent size={10} /> −{route.discount}%
                </span>
              )}

              <div className="route-path">
                <span className="route-point" title="ZRH" />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>ZRH</span>
                <div className="route-arrow-anim" aria-hidden />
                <span className="route-point b" />
                <span>{route.to}</span>
              </div>

              <div className="route-meta-row">
                <span className="route-pill">{route.km} {t('km')}</span>
                <span className="route-pill">{route.duration}</span>
                <span className="route-pill">{route.type}</span>
              </div>

              <div className="route-price-block">
                <span className="route-price-new">
                  {route.price.toFixed(2)} CHF
                  <span className="price-loader" aria-hidden />
                </span>
                {route.oldPrice != null && (
                  <span className="route-price-old">{route.oldPrice} CHF</span>
                )}
              </div>

              <span
                className="micro mt-3 inline-flex items-center gap-1"
                style={{ color: 'var(--accent)', textTransform: 'none', fontSize: 11 }}
              >
                {t('fixedPrice')} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={`/${locale}/routen`} className="btn-accent no-underline inline-flex items-center gap-2">
            {t('viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Percent, ArrowRight } from 'lucide-react';
import { POPULAR_ROUTES } from '@/lib/routes-data';

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
          {POPULAR_ROUTES.map((route) => (
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

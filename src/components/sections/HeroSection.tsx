'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import BookingCard from '@/components/booking/BookingCard';

export default function HeroSection() {
  const t = useTranslations('hero');

  const stats = [
    { value: '5.0 ★', label: t('statGoogle') },
    { value: '4.8 ★', label: t('statTrust') },
    { value: '15+', label: t('statYears') },
    { value: '7/24', label: t('statAvail') },
  ];

  return (
    <section className="hero">
      <div className="hero-image-wrap" aria-hidden>
        <Image
          src="/images/besttaxi.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="hero-grid">
        <div className="hero-top">
          <div className="hero-badge">
            <Sparkles size={12} />
            <span className="micro" style={{ color: 'inherit', textTransform: 'none', fontSize: 11 }}>
              {t('badge')}
            </span>
          </div>
          <h1 className="hero-title">
            {t('title')}
            <br />
            <span>{t('titleHighlight')}</span>
          </h1>
          <p className="hero-sub">{t('subtitle')}</p>
          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-num">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <BookingCard />
      </div>
    </section>
  );
}

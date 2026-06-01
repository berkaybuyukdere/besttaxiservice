'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

const REVIEWS = [
  { initials: 'WM', name: 'Wolfgang Müller', source: 'Google', text: 'Reliable airport transfer. Fixed price is fair and transparent.' },
  { initials: 'SK', name: 'Sara Kessler', source: 'TrustPilot', text: 'Pünktlich, professionell und sehr komfortabel. Nur zu empfehlen!' },
  { initials: 'AP', name: 'Andrea Pellegrini', source: 'Google', text: 'Servizio eccellente! Prezzo fisso conveniente.' },
];

export default function ReviewsSection() {
  const t = useTranslations('reviews');

  return (
    <section className="section">
      <p className="micro mb-2 text-[var(--accent-dark)]">Bewertungen</p>
      <h2 className="section-title">{t('title')}</h2>
      <p className="section-sub">{t('subtitle')}</p>

      <div className="reviews-row">
        <div>
          <div className="rating-big">
            <div className="rating-num">5.0</div>
            <div className="flex justify-center gap-0.5 my-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
              ))}
            </div>
            <div className="rating-src">{t('googleRating')}</div>
          </div>
          <div className="rating-big">
            <div className="rating-num" style={{ fontSize: 36 }}>4.8</div>
            <div className="rating-src">{t('trustpilot')}</div>
          </div>
        </div>
        <div className="review-cards">
          {REVIEWS.map((r) => (
            <div key={r.name} className="review-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] text-black flex items-center justify-center text-xs font-bold">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.source}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

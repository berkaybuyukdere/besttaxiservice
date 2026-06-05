'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    initials: 'WM',
    name: 'Wolfgang Müller',
    source: 'Google',
    rating: 5,
    text: 'Reliable airport transfer. Fixed price is fair and transparent. Driver was waiting with a name sign.',
    route: 'ZRH → Zug',
  },
  {
    initials: 'SK',
    name: 'Sara Kessler',
    source: 'TrustPilot',
    rating: 5,
    text: 'Pünktlich, professionell und sehr komfortabel. Mercedes V-Klasse war perfekt für unsere Familie.',
    route: 'ZRH → Davos',
  },
  {
    initials: 'AP',
    name: 'Andrea Pellegrini',
    source: 'Google',
    rating: 5,
    text: 'Servizio eccellente! Prezzo fisso conveniente. Consigliato per transfer aeroportuali.',
    route: 'ZRH → Milano',
  },
];

export default function ReviewsSection() {
  const t = useTranslations('reviews');

  return (
    <section className="section reviews-section-lux">
      <div className="reviews-header-lux">
        <div>
          <p className="micro mb-2 lux-gold">Bewertungen</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </div>
        <div className="reviews-scores">
          <div className="review-score-card">
            <div className="score-num">5.0</div>
            <div className="score-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" />
              ))}
            </div>
            <div className="score-label">{t('googleRating')}</div>
          </div>
          <div className="review-score-card">
            <div className="score-num">4.8</div>
            <div className="score-label">{t('trustpilot')}</div>
          </div>
        </div>
      </div>

      <div className="reviews-grid-lux">
        {REVIEWS.map((r) => (
          <article key={r.name} className="review-card-lux">
            <Quote size={20} className="review-quote-icon" />
            <p className="review-text-lux">&ldquo;{r.text}&rdquo;</p>
            <div className="review-footer-lux">
              <div className="review-avatar">{r.initials}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-meta">
                  {r.source} · {r.route}
                </div>
              </div>
              <div className="review-stars-inline">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={11} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

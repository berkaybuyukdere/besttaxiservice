import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, Clock, Car } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import { getRouteBySlug } from '@/lib/routes-data';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function RouteDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const bookUrl = `/${locale}/booking/search?from=${encodeURIComponent('Zürich Flughafen (ZRH)')}&to=${encodeURIComponent(route.to)}&price=${Math.round(route.price)}`;

  return (
    <PageShell>
      <div className="page-hero-sm">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2 lux-gold">Fixpreis · ZRH</p>
          <h1>
            Zürich Flughafen → <span>{route.to}</span>
          </h1>
          <p>Premium Transfer mit garantiertem Fixpreis — keine versteckten Gebühren.</p>
        </div>
      </div>

      <section className="section route-detail-section">
        <div className="route-detail-card">
          <div className="route-path route-path-lg">
            <span className="route-point" />
            <span>ZRH</span>
            <div className="route-arrow-anim" aria-hidden />
            <span className="route-point b" />
            <span>{route.to}</span>
          </div>

          <div className="route-detail-meta">
            <span><MapPin size={14} /> {route.km} km</span>
            <span><Clock size={14} /> {route.duration}</span>
            <span><Car size={14} /> {route.type}</span>
          </div>

          <div className="route-detail-price">
            <span className="price-main">CHF {route.price.toFixed(2)}</span>
            {route.oldPrice != null && (
              <span className="price-old">statt CHF {route.oldPrice}</span>
            )}
          </div>

          <p className="route-detail-note">
            Inkl. Meet &amp; Greet, Flugtracking und professionellem Chauffeur. Gratis Baby- &amp; Kindersitze auf Anfrage.
          </p>

          <Link href={bookUrl} className="btn-accent no-underline inline-flex items-center gap-2">
            Jetzt buchen <ArrowRight size={16} />
          </Link>
        </div>

        <div className="route-detail-back">
          <Link href={`/${locale}/routen`} className="admin-link">
            ← Alle Routen
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function generateStaticParams() {
  const locales = ['de', 'en', 'fr', 'it'];
  return locales.flatMap((locale) =>
    ['zug', 'luzern', 'basel', 'davos', 'st-moritz', 'bern'].map((slug) => ({
      locale,
      slug: `zuerich-flughafen-${slug}`,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return { title: 'Route' };
  return {
    title: `ZRH → ${route.to} | Best Taxi Service`,
    description: `Fixpreis Transfer Zürich Flughafen nach ${route.to} ab CHF ${route.price.toFixed(2)}`,
  };
}

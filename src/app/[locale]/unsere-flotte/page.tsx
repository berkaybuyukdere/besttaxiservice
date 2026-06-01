import Image from 'next/image';
import PageShell from '@/components/layout/PageShell';
import FleetSection from '@/components/sections/FleetSection';

export default function UnsereFlottePage() {
  return (
    <PageShell>
      <div className="fleet-page-hero">
        <div className="hero-image-wrap" aria-hidden>
          <Image
            src="/images/beststaxi2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="hero-grid" style={{ paddingBottom: 0 }}>
          <div className="hero-top">
            <p className="micro mb-3" style={{ color: 'var(--accent)' }}>
              Mercedes · Flughafen Zürich
            </p>
            <h1 className="hero-title">
              Unsere <span style={{ color: 'var(--accent)' }}>Flotte</span>
            </h1>
            <p className="hero-sub">
              Premium Fahrzeuge für Business, Familie und VIP – komfortabel bis ans Ziel.
            </p>
          </div>
        </div>
      </div>
      <FleetSection fullPage />
    </PageShell>
  );
}

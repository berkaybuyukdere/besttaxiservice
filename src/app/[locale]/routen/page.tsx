import PageShell from '@/components/layout/PageShell';
import RoutesSection from '@/components/sections/RoutesSection';

export default function RoutenPage() {
  return (
    <PageShell>
      <div className="page-hero-sm">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2" style={{ color: 'var(--accent)' }}>Fixpreise</p>
          <h1>
            Alle <span>Routen</span>
          </h1>
        </div>
      </div>
      <RoutesSection />
    </PageShell>
  );
}

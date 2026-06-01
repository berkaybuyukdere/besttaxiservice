import PageShell from '@/components/layout/PageShell';

export default function UeberUnsPage() {
  return (
    <PageShell>
      <div className="page-hero-sm">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2" style={{ color: 'var(--accent)' }}>Seit 2010</p>
          <h1>
            Über <span>uns</span>
          </h1>
          <p>Ihr Partner für erstklassige Flughafentransfers ab Zürich.</p>
        </div>
      </div>
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="admin-card bg-black text-white">
            <div className="text-5xl font-bold text-[var(--accent)]">15+</div>
            <p className="text-sm opacity-60 mt-2">Jahre Erfahrung</p>
          </div>
          <div className="admin-card">
            <div className="text-5xl font-bold text-[var(--accent-dark)]">5.0★</div>
            <p className="text-sm text-gray-500 mt-2">Google Bewertung</p>
          </div>
        </div>
        <div className="max-w-2xl text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            Best Taxi Service bietet Premium-Flughafentransfers mit garantierten Fixpreisen, professionellen Fahrern und
            7/24 Verfügbarkeit.
          </p>
          <p>
            <strong className="text-black">Industriestrasse 14, 8302 Kloten</strong>
            <br />
            +41 76 302 03 26 · info@besttaxiservice.ch
          </p>
        </div>
      </section>
    </PageShell>
  );
}

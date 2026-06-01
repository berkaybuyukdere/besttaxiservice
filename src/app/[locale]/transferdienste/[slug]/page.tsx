import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  PlaneLanding,
  PlaneTakeoff,
  Briefcase,
  Users,
  Crown,
  Clock,
  Mountain,
  Check,
  ArrowRight,
} from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import { TRANSFER_SERVICES, type TransferServiceSlug } from '@/lib/transfer-services';

const ICONS = {
  PlaneLanding,
  PlaneTakeoff,
  Briefcase,
  Users,
  Crown,
  Clock,
  Mountain,
};

export default async function TransferServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = TRANSFER_SERVICES[slug as TransferServiceSlug];
  if (!service) notFound();

  const Icon = ICONS[service.icon as keyof typeof ICONS] ?? PlaneLanding;

  return (
    <PageShell>
      <div className="page-hero-sm">
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="service-hero-icon">
            <Icon size={28} />
          </div>
          <p className="micro mb-2" style={{ color: 'var(--accent)' }}>
            Transferdienst
          </p>
          <h1>
            {service.titleDe.replace(/(\S+)$/, '')}
            <span>{service.titleDe.split(' ').slice(-1)[0]}</span>
          </h1>
          <p className="mt-4">{service.descriptionDe}</p>
          <p className="micro mt-6" style={{ color: 'var(--accent)' }}>
            ab CHF {service.priceFrom}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title text-xl">Leistungen</h2>
            <ul className="feature-list mt-4">
              {service.featuresDe.map((f) => (
                <li key={f}>
                  <Check size={16} className="text-[var(--accent-dark)] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-card">
            <h3 className="font-bold text-lg mb-2">Jetzt buchen</h3>
            <p className="text-sm text-gray-500 mb-6">
              Fixpreis, sofortige Bestätigung (ausser Gleichtag-Buchungen).
            </p>
            <Link href={`/${locale}/booking/search?service=${slug}`} className="btn-accent no-underline inline-flex items-center gap-2">
              Buchung starten <ArrowRight size={14} />
            </Link>
            <Link
              href={`/${locale}/preisliste`}
              className="btn-ghost no-underline inline-flex items-center gap-2 mt-3 ml-0"
              style={{ display: 'flex', width: 'fit-content' }}
            >
              Preisliste ansehen
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function generateStaticParams() {
  return Object.keys(TRANSFER_SERVICES).map((slug) => ({ slug }));
}

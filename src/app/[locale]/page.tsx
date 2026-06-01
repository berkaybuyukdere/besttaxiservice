import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import HeroSection from '@/components/sections/HeroSection';
import FleetSection from '@/components/sections/FleetSection';
import RoutesSection from '@/components/sections/RoutesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import USPSection from '@/components/sections/USPSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: `Best Taxi Service – ${t('title')} ${t('titleHighlight')}`,
    description: 'Premium Flughafentransfer ab Zürich. Fixpreise, 7/24.',
  };
}

export default function HomePage() {
  return (
    <PageShell darkHero>
      <HeroSection />
      <FleetSection />
      <RoutesSection />
      <ReviewsSection />
      <USPSection />
    </PageShell>
  );
}

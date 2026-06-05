import PageShell from '@/components/layout/PageShell';
import PreislisteClient from './PreislisteClient';

export default function PreislistePage() {
  return (
    <PageShell className="lux-preisliste">
      <PreislisteClient />
    </PageShell>
  );
}

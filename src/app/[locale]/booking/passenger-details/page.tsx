import PageShell from '@/components/layout/PageShell';
import PassengerDetailsClient from './PassengerDetailsClient';

export default function PassengerDetailsPage() {
  return (
    <PageShell>
      <div className="bg-gray-100 min-h-[60vh] py-8">
        <PassengerDetailsClient />
      </div>
    </PageShell>
  );
}

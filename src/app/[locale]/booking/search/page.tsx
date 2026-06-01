import PageShell from '@/components/layout/PageShell';
import BookingSearchClient from './BookingSearchClient';

export default function BookingSearchPage() {
  return (
    <PageShell>
      <div className="bg-gray-100 min-h-[60vh] py-8">
        <BookingSearchClient />
      </div>
    </PageShell>
  );
}

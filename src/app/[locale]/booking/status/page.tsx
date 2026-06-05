import { Suspense } from 'react';
import BookingStatusClient from './BookingStatusClient';

export default function BookingStatusPage() {
  return (
    <Suspense>
      <BookingStatusClient />
    </Suspense>
  );
}

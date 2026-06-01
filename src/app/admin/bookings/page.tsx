'use client';

import { useState } from 'react';
import { Check, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_BOOKINGS = [
  { id: 'BTS-M4X1-KP2', customer: 'Wolfgang Müller', email: 'w.mueller@example.com', route: 'ZRH → Zug', date: '2026-05-21', time: '09:00', vehicle: 'Business & Family', status: 'CONFIRMED', price: 138, isSameDay: false },
  { id: 'BTS-M4X2-RQ7', customer: 'Sara Kessler', email: 's.kessler@example.com', route: 'ZRH → Davos', date: '2026-05-21', time: '14:00', vehicle: 'VIP Ultra', status: 'PENDING', price: 600, isSameDay: true },
  { id: 'BTS-M4X3-AB9', customer: 'Andrea Pellegrini', email: 'a.pellegrini@example.com', route: 'ZRH → Basel', date: '2026-05-22', time: '10:30', vehicle: 'Premium', status: 'CONFIRMED', price: 350, isSameDay: false },
  { id: 'BTS-M4X4-CD5', customer: 'Hans Schmidt', email: 'h.schmidt@example.com', route: 'ZRH → Luzern', date: '2026-05-21', time: '16:00', vehicle: 'Business & Family', status: 'PENDING', price: 190, isSameDay: true },
  { id: 'BTS-M4X5-EF3', customer: 'Marie Dupont', email: 'm.dupont@example.com', route: 'ZRH → Bern', date: '2026-05-23', time: '08:00', vehicle: 'Premium', status: 'COMPLETED', price: 500, isSameDay: false },
];

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ausstehend',
  CONFIRMED: 'Bestätigt',
  CANCELLED: 'Abgebrochen',
  COMPLETED: 'Abgeschlossen',
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: 'bg-green-100 text-green-700',
  PENDING: 'bg-orange-100 text-orange-700',
  CANCELLED: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
};

type FilterType = 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [search, setSearch] = useState('');

  const handleStatusChange = (id: string, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filtered = bookings.filter((b) => {
    const matchesFilter = filter === 'ALL' || b.status === filter;
    const matchesSearch =
      search === '' ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.route.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
        <div className="mb-6">
          <p className="micro text-[var(--accent-dark)] mb-1">Verwaltung</p>
          <h1 className="text-2xl font-bold">Buchungen</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-tertiary)] rounded-lg bg-white text-sm flex-1 min-w-[200px]">
            <Search size={14} className="text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen nach ID, Kunde, Route..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <div className="flex gap-1.5">
            {(['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-2 text-[12px] rounded-lg border transition-all',
                  filter === f
                    ? 'bg-[#D85A30] text-white border-[#D85A30]'
                    : 'bg-white border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                )}
              >
                {f === 'ALL' ? 'Alle' : STATUS_LABELS[f]}
                {f === 'PENDING' && bookings.filter((b) => b.status === 'PENDING').length > 0 && (
                  <span className="ml-1.5 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 inline-flex items-center justify-center">
                    {bookings.filter((b) => b.status === 'PENDING').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)]">
                  <th className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Buchungs-ID</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Kunde</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Route</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Datum</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Fahrzeug</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Status</th>
                  <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Preis</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    className={cn(
                      'border-b border-[var(--color-border-tertiary)] last:border-0 transition-colors',
                      b.isSameDay ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-[var(--color-background-secondary)]'
                    )}
                  >
                    <td className="px-5 py-3">
                      <div className="font-mono text-[11px] text-[var(--color-text-secondary)]">{b.id}</div>
                      {b.isSameDay && (
                        <span className="text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">⚡ Gleichtag</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[13px]">{b.customer}</div>
                      <div className="text-[11px] text-[var(--color-text-secondary)]">{b.email}</div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[var(--color-text-secondary)]">{b.route}</td>
                    <td className="px-4 py-3 text-[13px]">{b.date} {b.time}</td>
                    <td className="px-4 py-3 text-[12px] text-[var(--color-text-secondary)]">{b.vehicle}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[#D85A30]">CHF {b.price}</td>
                    <td className="px-4 py-3">
                      {b.status === 'PENDING' && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleStatusChange(b.id, 'CONFIRMED')}
                            className="w-7 h-7 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 flex items-center justify-center transition-colors"
                            title="Bestätigen"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                            className="w-7 h-7 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors"
                            title="Ablehnen"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-[var(--color-text-secondary)] text-sm">
                      Keine Buchungen gefunden
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

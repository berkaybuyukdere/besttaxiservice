'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check, X, Search, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFleetByType } from '@/lib/fleet-data';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ausstehend',
  CONFIRMED: 'Bestätigt',
  CANCELLED: 'Abgebrochen',
  COMPLETED: 'Abgeschlossen',
};

type Booking = {
  bookingNumber: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleType: string;
  status: string;
  price: number;
  isSameDay: boolean;
  specialRequests?: string | null;
};

function getAuthHeader() {
  const creds = sessionStorage.getItem('adminCreds');
  if (!creds) return null;
  return `Basic ${creds}`;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    const auth = getAuthHeader();
    if (!auth) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings', { headers: { Authorization: auth } });
      if (res.ok) setBookings(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  const updateStatus = async (bookingNumber: string, status: string) => {
    const auth = getAuthHeader();
    if (!auth) return;
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingNumber, status }),
    });
    load();
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === 'ALL' || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.bookingNumber.toLowerCase().includes(q) ||
      b.passengerName.toLowerCase().includes(q) ||
      b.passengerEmail.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">Verwaltung</p>
          <h1 className="text-2xl font-bold text-white">Reservierungen</h1>
        </div>
        <button type="button" className="btn-ghost-admin" onClick={load}>
          <RefreshCw size={14} /> Aktualisieren
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="RES-Nummer, Name, E-Mail…"
          />
        </div>
        <div className="admin-filter-chips">
          {(['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={cn('filter-chip', filter === f && 'active')}>
              {f === 'ALL' ? 'Alle' : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Wird geladen…</p>
        ) : filtered.length === 0 ? (
          <p className="admin-empty">Keine Reservierungen</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Res.-Nr.</th>
                <th>Kunde</th>
                <th>Route</th>
                <th>Datum</th>
                <th>Fahrzeug</th>
                <th>Status</th>
                <th>Preis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const fleet = getFleetByType(b.vehicleType);
                return (
                  <tr key={b.bookingNumber} className={b.isSameDay ? 'row-urgent' : ''}>
                    <td>
                      <code className="res-code">{b.bookingNumber}</code>
                      {b.isSameDay && <span className="urgent-tag">Gleichtag</span>}
                    </td>
                    <td>
                      <strong>{b.passengerName}</strong>
                      <span className="sub">{b.passengerEmail}</span>
                      <span className="sub">{b.passengerPhone}</span>
                    </td>
                    <td>
                      {b.pickupLocation} → {b.dropoffLocation}
                    </td>
                    <td>
                      {new Date(b.pickupDate).toLocaleDateString('de-CH')} {b.pickupTime}
                    </td>
                    <td>{fleet?.name || b.vehicleType}</td>
                    <td>
                      <span className={`status-pill status-${b.status.toLowerCase()}`}>{STATUS_LABELS[b.status]}</span>
                    </td>
                    <td className="price-cell">CHF {b.price}</td>
                    <td>
                      {b.status === 'PENDING' && (
                        <div className="action-btns">
                          <button type="button" onClick={() => updateStatus(b.bookingNumber, 'CONFIRMED')} title="Bestätigen">
                            <Check size={14} />
                          </button>
                          <button type="button" onClick={() => updateStatus(b.bookingNumber, 'CANCELLED')} title="Ablehnen">
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

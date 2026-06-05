'use client';

import Link from 'next/link';
import { CalendarCheck, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK = [
  { id: 'RES-10001', customer: 'Wolfgang Müller', route: 'ZRH → Zug', status: 'CONFIRMED', price: 138, sameDay: false },
  { id: 'RES-10002', customer: 'Sara Kessler', route: 'ZRH → Davos', status: 'PENDING', price: 600, sameDay: true },
  { id: 'RES-10003', customer: 'Hans Schmidt', route: 'ZRH → Luzern', status: 'PENDING', price: 190, sameDay: true },
];

export default function AdminDashboardPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">Übersicht</p>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
      </div>

      <div className="admin-stat-grid">
        {[
          { label: 'Heute', value: '4', icon: CalendarCheck },
          { label: 'Ausstehend', value: '2', icon: AlertCircle, urgent: true },
          { label: 'Umsatz (Monat)', value: 'CHF 8’450', icon: TrendingUp },
          { label: 'Gesamt', value: '127', icon: Clock },
        ].map(({ label, value, icon: Icon, urgent }) => (
          <div key={label} className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-label">{label}</span>
              <Icon size={18} className="admin-stat-icon" />
            </div>
            <div className="admin-stat-value">
              {value}
              {urgent && <span className="admin-urgent-badge">!</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h2>Aktuelle Buchungen</h2>
          <Link href="/admin/bookings" className="admin-link">
            Alle →
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kunde</th>
              <th>Route</th>
              <th>Status</th>
              <th className="text-right">Preis</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((b) => (
              <tr key={b.id} className={cn(b.sameDay && 'row-urgent')}>
                <td><code className="res-code">{b.id}</code></td>
                <td><strong>{b.customer}</strong></td>
                <td>{b.route}</td>
                <td>
                  <span className={`status-pill status-${b.status.toLowerCase()}`}>{b.status}</span>
                </td>
                <td className="price-cell text-right">CHF {b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

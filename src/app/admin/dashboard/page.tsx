'use client';

import Link from 'next/link';
import { CalendarCheck, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK = [
  { id: 'BTS-001', customer: 'Wolfgang Müller', route: 'ZRH → Zug', status: 'CONFIRMED', price: 138, sameDay: false },
  { id: 'BTS-002', customer: 'Sara Kessler', route: 'ZRH → Davos', status: 'PENDING', price: 600, sameDay: true },
  { id: 'BTS-003', customer: 'Hans Schmidt', route: 'ZRH → Luzern', status: 'PENDING', price: 190, sameDay: true },
];

export default function AdminDashboardPage() {
  return (
    <>
      <div className="mb-8">
        <p className="micro text-[var(--accent-dark)] mb-1">Übersicht</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Heute', value: '4', icon: CalendarCheck },
          { label: 'Ausstehend', value: '2', icon: AlertCircle, urgent: true },
          { label: 'Umsatz (Monat)', value: 'CHF 8’450', icon: TrendingUp },
          { label: 'Gesamt', value: '127', icon: Clock },
        ].map(({ label, value, icon: Icon, urgent }) => (
          <div key={label} className="admin-card">
            <div className="flex justify-between mb-3">
              <span className="label-xs">{label}</span>
              <Icon size={18} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {value}
              {urgent && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">!</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
          <h2 className="font-semibold">Aktuelle Buchungen</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-[var(--accent-dark)]">
            Alle →
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 label-xs">ID</th>
              <th className="px-4 py-3 label-xs">Kunde</th>
              <th className="px-4 py-3 label-xs">Route</th>
              <th className="px-4 py-3 label-xs">Status</th>
              <th className="px-6 py-3 label-xs text-right">Preis</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((b) => (
              <tr key={b.id} className={cn('border-t border-gray-100', b.sameDay && 'bg-amber-50')}>
                <td className="px-6 py-3 font-mono text-xs">{b.id}</td>
                <td className="px-4 py-3 font-medium">{b.customer}</td>
                <td className="px-4 py-3 text-gray-500">{b.route}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right font-bold">CHF {b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

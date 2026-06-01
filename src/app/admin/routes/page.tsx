'use client';

import { Plus, Edit2 } from 'lucide-react';
import { FIXED_ROUTES } from '@/lib/pricing-data';

export default function AdminRoutesPage() {
  return (
    <>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="micro text-[var(--accent-dark)] mb-1">SEO Routen</p>
            <h1 className="text-2xl font-bold">Routen</h1>
          </div>
          <button type="button" className="btn-accent text-sm flex items-center gap-1">
            <Plus size={14} /> Route hinzufügen
          </button>
        </div>

        <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)]">
                <th className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Von</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Nach</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Preis</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {FIXED_ROUTES.map((route, i) => (
                <tr key={i} className="border-b border-[var(--color-border-tertiary)] last:border-0 hover:bg-[var(--color-background-secondary)] transition-colors">
                  <td className="px-5 py-3 font-medium text-[13px]">{route.from}</td>
                  <td className="px-4 py-3 text-[13px]">{route.to}</td>
                  <td className="px-4 py-3">
                    {route.onRequest ? (
                      <span className="text-[12px] text-[var(--color-text-secondary)]">Auf Anfrage</span>
                    ) : (
                      <span className="font-medium text-[#D85A30]">CHF {route.price?.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="w-7 h-7 rounded-lg bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] flex items-center justify-center">
                      <Edit2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
}

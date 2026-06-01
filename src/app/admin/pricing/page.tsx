'use client';

import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { PRICING_DATA, REGIONS } from '@/lib/pricing-data';
import { cn } from '@/lib/utils';

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState(PRICING_DATA.map((p, i) => ({ ...p, id: String(i) })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, number>>({});
  const [selectedRegion, setSelectedRegion] = useState<string>(REGIONS[0]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const startEdit = (entry: (typeof pricing)[0]) => {
    setEditingId(entry.id);
    setEditValues({
      taxiToAirport: entry.taxiToAirport,
      vanToAirport: entry.vanToAirport,
      taxiToZurich: entry.taxiToZurich,
      vanToZurich: entry.vanToZurich,
    });
  };

  const saveEdit = (id: string) => {
    setPricing((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...editValues } : p
      )
    );
    setEditingId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const filteredPricing = pricing.filter((p) => p.region === selectedRegion);

  return (
    <>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="micro text-[var(--accent-dark)] mb-1">Live-Preise</p>
            <h1 className="text-2xl font-bold">Preisliste</h1>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm">
              <Check size={14} /> Gespeichert
            </div>
          )}
        </div>

        {/* Region tabs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={cn(
                'px-3 py-1.5 text-[12px] rounded-lg border transition-all',
                selectedRegion === region
                  ? 'bg-[#D85A30] text-white border-[#D85A30]'
                  : 'bg-white border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
              )}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)]">
                  <th className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Destination</th>
                  <th className="text-center px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Taxi → Flughafen</th>
                  <th className="text-center px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Van → Flughafen</th>
                  <th className="text-center px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Taxi → Zürich</th>
                  <th className="text-center px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Van → Zürich</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPricing.map((entry) => (
                  <tr key={entry.id} className="border-b border-[var(--color-border-tertiary)] last:border-0 hover:bg-[var(--color-background-secondary)] transition-colors">
                    <td className="px-5 py-3 font-medium text-[13px]">{entry.location}</td>
                    {editingId === entry.id ? (
                      <>
                        {(['taxiToAirport', 'vanToAirport', 'taxiToZurich', 'vanToZurich'] as const).map((field) => (
                          <td key={field} className="px-4 py-3 text-center">
                            <div className="flex items-center gap-1 justify-center">
                              <span className="text-[11px] text-[var(--color-text-secondary)]">CHF</span>
                              <input
                                type="number"
                                value={editValues[field]}
                                onChange={(e) => setEditValues({ ...editValues, [field]: parseFloat(e.target.value) })}
                                className="w-16 text-center border border-[#D85A30] rounded-[6px] px-1.5 py-1 text-[13px] outline-none"
                              />
                            </div>
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => saveEdit(entry.id)}
                              className="w-7 h-7 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 flex items-center justify-center"
                            >
                              <Check size={13} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="w-7 h-7 rounded-lg bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] flex items-center justify-center"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        {([entry.taxiToAirport, entry.vanToAirport, entry.taxiToZurich, entry.vanToZurich]).map((price, i) => (
                          <td key={i} className="px-4 py-3 text-center">
                            <span className="font-medium text-[#D85A30]">CHF {price}</span>
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => startEdit(entry)}
                            className="w-7 h-7 rounded-lg bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] flex items-center justify-center transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

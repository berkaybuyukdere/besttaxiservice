'use client';

import { useState } from 'react';
import { Edit2, Check, X, MapPin } from 'lucide-react';
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
    setPricing((prev) => prev.map((p) => (p.id === id ? { ...p, ...editValues } : p)));
    setEditingId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const filteredPricing = pricing.filter((p) => p.region === selectedRegion);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">Live-Preise</p>
          <h1 className="admin-page-title">Preisliste</h1>
          <p className="admin-page-sub">Fixpreise nach Region — direkt bearbeitbar</p>
        </div>
        {saveSuccess && (
          <div className="admin-toast success">
            <Check size={14} /> Gespeichert
          </div>
        )}
      </div>

      <div className="admin-filter-chips" style={{ marginBottom: 20 }}>
        {REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setSelectedRegion(region)}
            className={cn('filter-chip', selectedRegion === region && 'active')}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h2>
            <MapPin size={14} /> {selectedRegion}
          </h2>
          <span className="admin-meta">{filteredPricing.length} Destinationen</span>
        </div>
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th className="text-center">Taxi → Flughafen</th>
                <th className="text-center">Van → Flughafen</th>
                <th className="text-center">Taxi → Zürich</th>
                <th className="text-center">Van → Zürich</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredPricing.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <strong>{entry.location}</strong>
                    <span className="sub">{entry.region}</span>
                  </td>
                  {editingId === entry.id ? (
                    <>
                      {(['taxiToAirport', 'vanToAirport', 'taxiToZurich', 'vanToZurich'] as const).map((field) => (
                        <td key={field} className="text-center">
                          <div className="admin-price-input">
                            <span>CHF</span>
                            <input
                              type="number"
                              value={editValues[field]}
                              onChange={(e) => setEditValues({ ...editValues, [field]: parseFloat(e.target.value) })}
                            />
                          </div>
                        </td>
                      ))}
                      <td>
                        <div className="action-btns">
                          <button type="button" onClick={() => saveEdit(entry.id)} title="Speichern">
                            <Check size={14} />
                          </button>
                          <button type="button" onClick={() => setEditingId(null)} title="Abbrechen">
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      {[entry.taxiToAirport, entry.vanToAirport, entry.taxiToZurich, entry.vanToZurich].map((price, i) => (
                        <td key={i} className="price-cell text-center">
                          CHF {price}
                        </td>
                      ))}
                      <td>
                        <button type="button" className="admin-icon-btn" onClick={() => startEdit(entry)} title="Bearbeiten">
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

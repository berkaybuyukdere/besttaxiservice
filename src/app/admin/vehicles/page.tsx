'use client';

import { useState } from 'react';
import { Plus, Edit2, Users, Briefcase } from 'lucide-react';

const MOCK_VEHICLES = [
  { id: '1', name: 'Business & Family Class', model: 'Mercedes Benz V-Class', capacity: 7, luggage: 7, priceMultiplier: 1.0, isActive: true, icon: '🚐' },
  { id: '2', name: 'VIP Ultra Comfort', model: 'Mercedes Benz V300 Maybach', capacity: 5, luggage: 5, priceMultiplier: 1.3, isActive: true, icon: '🚙' },
  { id: '3', name: 'Premium Class', model: 'Mercedes Benz S-Class', capacity: 3, luggage: 3, priceMultiplier: 1.5, isActive: true, icon: '🚗' },
];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);

  const toggleActive = (id: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v)));
  };

  return (
    <>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="micro text-[var(--accent-dark)] mb-1">Flotte</p>
            <h1 className="text-2xl font-bold">Fahrzeuge</h1>
          </div>
          <button type="button" className="btn-accent text-sm flex items-center gap-1">
            <Plus size={14} /> Hinzufügen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className={`bg-white border rounded-[14px] overflow-hidden ${v.isActive ? 'border-[var(--color-border-tertiary)]' : 'border-dashed border-[var(--color-border-secondary)] opacity-60'}`}>
              <div className="h-36 bg-[var(--color-background-secondary)] flex items-center justify-center text-[56px]">
                {v.icon}
              </div>
              <div className="p-4">
                <div className="font-medium text-[14px] mb-0.5">{v.name}</div>
                <div className="text-[12px] text-[var(--color-text-secondary)] mb-3">{v.model}</div>
                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-secondary)]">
                    <Users size={12} /> {v.capacity}
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-secondary)]">
                    <Briefcase size={12} /> {v.luggage}
                  </div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">
                    ×{v.priceMultiplier}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1">
                    <Edit2 size={12} /> Bearbeiten
                  </button>
                  <button
                    onClick={() => toggleActive(v.id)}
                    className={`flex-1 text-[12px] rounded-[6px] px-3 py-1.5 border transition-all ${
                      v.isActive
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-tertiary)]'
                    }`}
                  >
                    {v.isActive ? '● Aktiv' : '○ Inaktiv'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  );
}

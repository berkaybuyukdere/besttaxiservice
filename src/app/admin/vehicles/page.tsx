'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Users, Briefcase } from 'lucide-react';
import { FLEET_VEHICLES } from '@/lib/fleet-data';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState(FLEET_VEHICLES.map((v) => ({ ...v, isActive: true })));

  const toggleActive = (id: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v)));
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">Flotte</p>
          <h1 className="admin-page-title">Fahrzeuge</h1>
          <p className="admin-page-sub">Premium-Fahrzeuge mit Fotos und Kapazitäten</p>
        </div>
        <button type="button" className="btn-accent-admin">
          <Plus size={14} /> Hinzufügen
        </button>
      </div>

      <div className="admin-vehicle-grid">
        {vehicles.map((v) => (
          <article key={v.id} className={`admin-vehicle-card${v.isActive ? '' : ' inactive'}`}>
            <div className="admin-vehicle-photo">
              <Image src={v.image} alt={v.name} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="admin-vehicle-body">
              <p className="admin-vehicle-model">{v.model}</p>
              <h3>{v.name}</h3>
              <p className="admin-vehicle-desc">{v.description}</p>
              <div className="admin-vehicle-specs">
                <span><Users size={12} /> {v.capacity}</span>
                <span><Briefcase size={12} /> {v.luggage}</span>
                <span>×{v.multiplier}</span>
                <span className="price-cell">ab CHF {v.startPrice}</span>
              </div>
              <div className="admin-vehicle-actions">
                <button type="button" className="btn-ghost-admin">
                  <Edit2 size={12} /> Bearbeiten
                </button>
                <button
                  type="button"
                  onClick={() => toggleActive(v.id)}
                  className={v.isActive ? 'admin-toggle active' : 'admin-toggle'}
                >
                  {v.isActive ? '● Aktiv' : '○ Inaktiv'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

'use client';

import { Plus, Edit2, ArrowRight } from 'lucide-react';
import { FIXED_ROUTES } from '@/lib/pricing-data';

export default function AdminRoutesPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">SEO Routen</p>
          <h1 className="admin-page-title">Routen</h1>
          <p className="admin-page-sub">Beliebte Flughafen-Transfers mit Fixpreisen</p>
        </div>
        <button type="button" className="btn-accent-admin">
          <Plus size={14} /> Route hinzufügen
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Von</th>
              <th>Nach</th>
              <th>Preis</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {FIXED_ROUTES.map((route, i) => (
              <tr key={i}>
                <td>
                  <strong>{route.from}</strong>
                </td>
                <td>
                  <span className="route-inline">
                    {route.from} <ArrowRight size={12} /> {route.to}
                  </span>
                </td>
                <td className="price-cell">
                  {route.onRequest ? 'Auf Anfrage' : `CHF ${route.price?.toLocaleString('de-CH')}`}
                </td>
                <td>
                  <button type="button" className="admin-icon-btn" title="Bearbeiten">
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

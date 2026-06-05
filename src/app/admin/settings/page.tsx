'use client';

import { useState } from 'react';
import { Save, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'Best Taxi Service',
    address: 'Industriestrasse 14, 8302 Kloten',
    phone: '+41 76 302 03 26',
    email: 'info@besttaxiservice.ch',
    adminEmail: 'admin@besttaxiservice.ch',
    sameDayConfirmMinutes: 30,
    resendApiKey: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    { label: 'Firmenname', key: 'companyName' },
    { label: 'Adresse', key: 'address' },
    { label: 'Telefon', key: 'phone' },
    { label: 'E-Mail', key: 'email' },
    { label: 'Admin E-Mail', key: 'adminEmail' },
  ] as const;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="micro lux-gold mb-1">System</p>
          <h1 className="admin-page-title">Einstellungen</h1>
          <p className="admin-page-sub">Firmendaten, Buchungsregeln und E-Mail</p>
        </div>
      </div>

      <div className="admin-settings-grid">
        <div className="admin-panel">
          <h2>Firmendaten</h2>
          <div className="admin-form-fields">
            {fields.map(({ label, key }) => (
              <div key={key} className="admin-field">
                <label>{label}</label>
                <input
                  type="text"
                  value={settings[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <h2>Buchungseinstellungen</h2>
          <div className="admin-field">
            <label>Gleichtag-Bestätigung Zeitfenster (Minuten)</label>
            <input
              type="number"
              value={settings.sameDayConfirmMinutes}
              onChange={(e) => setSettings({ ...settings, sameDayConfirmMinutes: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="admin-panel">
          <h2>E-Mail Konfiguration</h2>
          <div className="admin-field">
            <label>Resend API Key</label>
            <input
              type="password"
              value={settings.resendApiKey}
              onChange={(e) => setSettings({ ...settings, resendApiKey: e.target.value })}
              placeholder="re_..."
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-footer">
        <button type="button" onClick={handleSave} className="btn-accent-admin">
          {saved ? <><Check size={14} /> Gespeichert</> : <><Save size={14} /> Einstellungen speichern</>}
        </button>
      </div>
    </>
  );
}

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
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    resendApiKey: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
        <div className="mb-6">
          <p className="micro text-[var(--accent-dark)] mb-1">System</p>
          <h1 className="text-2xl font-bold">Einstellungen</h1>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Company info */}
          <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-6">
            <h2 className="text-[15px] font-medium mb-4">Firmendaten</h2>
            <div className="space-y-4">
              {[
                { label: 'Firmenname', key: 'companyName' },
                { label: 'Adresse', key: 'address' },
                { label: 'Telefon', key: 'phone' },
                { label: 'E-Mail', key: 'email' },
                { label: 'Admin E-Mail', key: 'adminEmail' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={settings[key as keyof typeof settings]}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background-secondary)] text-sm outline-none focus:border-[#D85A30] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Booking settings */}
          <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-6">
            <h2 className="text-[15px] font-medium mb-4">Buchungseinstellungen</h2>
            <div>
              <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                Gleichtag-Bestätigung Zeitfenster (Minuten)
              </label>
              <input
                type="number"
                value={settings.sameDayConfirmMinutes}
                onChange={(e) => setSettings({ ...settings, sameDayConfirmMinutes: parseInt(e.target.value) })}
                className="w-32 px-3 py-2.5 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background-secondary)] text-sm outline-none focus:border-[#D85A30] transition-colors"
              />
            </div>
          </div>

          {/* Email settings */}
          <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-6">
            <h2 className="text-[15px] font-medium mb-4">E-Mail Konfiguration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">Resend API Key</label>
                <input
                  type="password"
                  value={settings.resendApiKey}
                  onChange={(e) => setSettings({ ...settings, resendApiKey: e.target.value })}
                  placeholder="re_..."
                  className="w-full px-3 py-2.5 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background-secondary)] text-sm outline-none focus:border-[#D85A30] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={handleSave} className="btn-accent flex items-center gap-1.5">
              {saved ? <><Check size={14} /> Gespeichert</> : <><Save size={14} /> Einstellungen speichern</>}
            </button>
          </div>
        </div>
    </>
  );
}

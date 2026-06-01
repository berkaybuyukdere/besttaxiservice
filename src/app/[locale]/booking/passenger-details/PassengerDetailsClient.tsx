'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight, User, Mail, Phone, Plane, MessageSquare, CreditCard, Banknote, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAYMENT_METHODS = [
  { id: 'CARD', label: 'Kreditkarte', icon: CreditCard },
  { id: 'CASH', label: 'Bargeld', icon: Banknote },
  { id: 'INVOICE', label: 'Rechnung', icon: FileText },
];

export default function PassengerDetailsClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const vehicle = searchParams.get('vehicle') || 'BUSINESS_FAMILY';
  const price = searchParams.get('price') || '70';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    flightNumber: '',
    specialRequests: '',
    paymentMethod: 'CARD',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Gültige E-Mail-Adresse erforderlich';
    }
    if (!form.phone.trim()) newErrors.phone = 'Telefonnummer ist erforderlich';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupDate: date,
          pickupTime: time,
          pickupLocation: from,
          dropoffLocation: to,
          vehicleType: vehicle,
          passengerName: form.name,
          passengerEmail: form.email,
          passengerPhone: form.phone,
          flightNumber: form.flightNumber,
          specialRequests: form.specialRequests,
          paymentMethod: form.paymentMethod,
          price: parseFloat(price),
        }),
      });

      const data = await response.json();
      if (data.bookingNumber) {
        router.push(`/${locale}/booking/confirmation?id=${data.bookingNumber}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const VEHICLE_NAMES: Record<string, string> = {
    BUSINESS_FAMILY: 'Business & Family Class',
    VIP_ULTRA_COMFORT: 'VIP Ultra Comfort',
    PREMIUM_CLASS: 'Premium Class',
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className="text-[var(--color-text-secondary)]">1. Suche</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">2. Fahrzeug</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[#D85A30] font-medium">3. Details</span>
        <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">4. Bestätigung</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-6">
            <h2 className="text-[18px] font-medium mb-5">Passagierdaten</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                  Vor- und Nachname *
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg bg-[var(--color-background-secondary)] ${errors.name ? 'border-red-400' : 'border-[var(--color-border-tertiary)]'}`}>
                  <User size={14} className="text-[var(--color-text-secondary)] shrink-0" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Max Mustermann"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                  E-Mail-Adresse *
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg bg-[var(--color-background-secondary)] ${errors.email ? 'border-red-400' : 'border-[var(--color-border-tertiary)]'}`}>
                  <Mail size={14} className="text-[var(--color-text-secondary)] shrink-0" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="max@beispiel.ch"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                  Telefonnummer *
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg bg-[var(--color-background-secondary)] ${errors.phone ? 'border-red-400' : 'border-[var(--color-border-tertiary)]'}`}>
                  <Phone size={14} className="text-[var(--color-text-secondary)] shrink-0" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+41 76 302 03 26"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              {/* Flight number */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                  Flugnummer (optional)
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background-secondary)]">
                  <Plane size={14} className="text-[var(--color-text-secondary)] shrink-0" />
                  <input
                    type="text"
                    value={form.flightNumber}
                    onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
                    placeholder="LX 123"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
                  Besondere Wünsche (optional)
                </label>
                <div className="flex items-start gap-2 px-3 py-2.5 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background-secondary)]">
                  <MessageSquare size={14} className="text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    placeholder="Kindersitz, Rollstuhl, Hilfe mit Gepäck..."
                    rows={3}
                    className="flex-1 bg-transparent outline-none text-sm resize-none"
                  />
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="block text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                  Zahlungsmethode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: id })}
                      className={`flex flex-col items-center gap-1.5 p-3 border rounded-[10px] text-[12px] transition-all ${
                        form.paymentMethod === id
                          ? 'border-[#D85A30] bg-[rgba(216,90,48,0.05)] text-[#D85A30]'
                          : 'border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
                {loading ? 'Wird gesendet...' : 'Buchung abschließen'} {!loading && <ArrowRight size={14} />}
              </Button>
            </form>
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-white border border-[var(--color-border-tertiary)] rounded-[14px] p-5 h-fit sticky top-24">
          <h3 className="text-[15px] font-medium mb-4">Buchungsübersicht</h3>
          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Von</span>
              <span className="font-medium text-right max-w-[160px]">{from || 'Zürich Flughafen'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Nach</span>
              <span className="font-medium text-right max-w-[160px]">{to || 'Ihr Ziel'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Datum</span>
              <span className="font-medium">{date || 'Heute'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Zeit</span>
              <span className="font-medium">{time || '08:00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Fahrzeug</span>
              <span className="font-medium text-right max-w-[160px] text-[12px]">{VEHICLE_NAMES[vehicle] || vehicle}</span>
            </div>
            <div className="border-t border-[var(--color-border-tertiary)] pt-3 flex justify-between">
              <span className="font-medium">Gesamtpreis</span>
              <span className="font-medium text-[18px] text-[#D85A30]">CHF {price}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-[var(--color-background-secondary)] rounded-[8px] text-[11px] text-[var(--color-text-secondary)]">
            ✓ Fixpreis garantiert<br />
            ✓ Kostenlose Stornierung bis 24h<br />
            ✓ Keine versteckten Gebühren
          </div>
        </div>
      </div>
    </div>
  );
}

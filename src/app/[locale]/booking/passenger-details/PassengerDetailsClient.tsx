'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import PhoneInput from '@/components/booking/PhoneInput';
import { FLEET_VEHICLES } from '@/lib/fleet-data';
import { formatPhoneNumber } from '@/lib/phone-countries';

const PAYMENT = [
  { id: 'CARD', label: 'Kreditkarte' },
  { id: 'CASH', label: 'Bargeld' },
  { id: 'INVOICE', label: 'Rechnung' },
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
  const vehicleLabel =
    searchParams.get('vehicleLabel') || FLEET_VEHICLES.find((v) => v.vehicleType === vehicle)?.name || vehicle;
  const price = searchParams.get('price') || '70';

  const [form, setForm] = useState({
    name: '',
    email: '',
    dialCode: '+41',
    phoneLocal: '',
    flightNumber: '',
    specialRequests: '',
    paymentMethod: 'CARD',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name erforderlich';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Gültige E-Mail';
    if (!form.phoneLocal.trim()) e.phone = 'Telefon erforderlich';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const passengerPhone = formatPhoneNumber(form.dialCode, form.phoneLocal);
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupDate: date,
          pickupTime: time,
          pickupLocation: from,
          dropoffLocation: to,
          vehicleType: vehicle,
          vehicleLabel,
          passengerName: form.name,
          passengerEmail: form.email,
          passengerPhone,
          flightNumber: form.flightNumber,
          specialRequests: form.specialRequests,
          paymentMethod: form.paymentMethod,
          price: parseFloat(price),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Reservierung fehlgeschlagen. Bitte erneut versuchen.');
        return;
      }
      if (data.bookingNumber) {
        router.push(`/${locale}/booking/confirmation?id=${data.bookingNumber}`);
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Verbindungsfehler. Bitte Internetverbindung prüfen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="lux-booking-page">
        <div className="booking-steps">
          <span className="step done">1. Suche</span>
          <ArrowRight size={14} />
          <span className="step done">2. Fahrzeug</span>
          <ArrowRight size={14} />
          <span className="step active">3. Details</span>
          <ArrowRight size={14} />
          <span className="step">4. Bestätigung</span>
        </div>

        <div className="lux-form-layout">
          <form onSubmit={handleSubmit} className="lux-form-card">
            <h2>Passagierdaten</h2>
            <div className="lux-field">
              <label>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                className="lux-input"
              />
              {errors.name && <p className="lux-error">{errors.name}</p>}
            </div>
            <div className="lux-field">
              <label>E-Mail *</label>
              <input
                type="email"
                value={form.email}
                onChange={(ev) => setForm({ ...form, email: ev.target.value })}
                className="lux-input"
              />
              {errors.email && <p className="lux-error">{errors.email}</p>}
            </div>
            <div className="lux-field">
              <PhoneInput
                label="Telefon *"
                dialCode={form.dialCode}
                localNumber={form.phoneLocal}
                onDialCodeChange={(dialCode) => setForm({ ...form, dialCode })}
                onLocalNumberChange={(phoneLocal) => setForm({ ...form, phoneLocal })}
                error={errors.phone}
              />
            </div>
            <div className="lux-field">
              <label>Flugnummer (optional)</label>
              <input
                type="text"
                value={form.flightNumber}
                onChange={(ev) => setForm({ ...form, flightNumber: ev.target.value })}
                className="lux-input"
                placeholder="LX 123"
              />
            </div>
            <div className="lux-field">
              <label>Besondere Wünsche</label>
              <textarea
                value={form.specialRequests}
                onChange={(ev) => setForm({ ...form, specialRequests: ev.target.value })}
                className="lux-input"
                rows={3}
              />
            </div>
            <div className="lux-field">
              <label>Zahlungsmethode</label>
              <div className="payment-row">
                {PAYMENT.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`pay-btn${form.paymentMethod === p.id ? ' active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: p.id })}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            {submitError && <p className="lux-error submit-error">{submitError}</p>}
            <button type="submit" className="booking-search-btn w-full" disabled={loading}>
              {loading ? 'Wird gesendet…' : 'Reservierung abschliessen'}
            </button>
          </form>

          <aside className="lux-summary-card">
            <h3>Übersicht</h3>
            <dl>
              <div>
                <dt>Von</dt>
                <dd>{from}</dd>
              </div>
              <div>
                <dt>Nach</dt>
                <dd>{to}</dd>
              </div>
              <div>
                <dt>Datum</dt>
                <dd>
                  {date} · {time}
                </dd>
              </div>
              <div>
                <dt>Fahrzeug</dt>
                <dd>{vehicleLabel}</dd>
              </div>
            </dl>
            <div className="total">
              <span>Fixpreis</span>
              <strong>CHF {price}</strong>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

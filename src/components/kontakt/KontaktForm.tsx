'use client';

import { useState } from 'react';

export default function KontaktForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'ok' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="kontakt-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="kontakt-name">Name</label>
        <input id="kontakt-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="kontakt-email">E-Mail</label>
        <input id="kontakt-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="kontakt-message">Nachricht</label>
        <textarea id="kontakt-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      {status === 'ok' && <p className="form-success">Nachricht gesendet — wir melden uns bald.</p>}
      {status === 'error' && <p className="lux-error">Senden fehlgeschlagen. Bitte erneut versuchen.</p>}
      <button type="submit" className="btn-accent inline-flex items-center gap-2" disabled={status === 'loading'}>
        {status === 'loading' ? 'Wird gesendet…' : 'Senden'}
      </button>
    </form>
  );
}

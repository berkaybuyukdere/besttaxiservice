'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';

export default function AnmeldenPage() {
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userAuth', 'true');
    router.push(`/${locale}`);
  };

  return (
    <PageShell>
      <section className="section flex justify-center py-16">
        <div className="auth-card w-full max-w-md border border-gray-200" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <p className="micro mb-2 text-[var(--accent-dark)]">Kundenbereich</p>
          <h1 className="text-2xl font-bold mb-1">Anmelden</h1>
          <p className="text-sm text-gray-500 mb-6">Zugang zu Ihren Buchungen</p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="booking-field">
              <label>
                <Mail size={12} /> E-Mail
              </label>
              <div className="booking-input">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre@email.ch" required />
              </div>
            </div>
            <div className="booking-field">
              <label>
                <Lock size={12} /> Passwort
              </label>
              <div className="booking-input">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="booking-search-btn w-full">
              <LogIn size={16} /> Anmelden
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Noch kein Konto?{' '}
            <Link href={`/${locale}/registrieren`} className="font-semibold text-black">
              Registrieren
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

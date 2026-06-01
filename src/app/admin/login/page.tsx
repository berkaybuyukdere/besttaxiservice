'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@besttaxiservice.ch' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="micro mb-2 flex items-center gap-2 text-[var(--accent-dark)]">
          <Lock size={12} /> Interner Zugang
        </p>
        <h1 className="text-xl font-bold mb-1">Admin Panel</h1>
        <p className="text-xs text-gray-500 mb-6">Nicht öffentlich verlinkt · Nur autorisiertes Personal</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>
        )}

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="booking-field">
            <label className="label-xs">E-Mail</label>
            <div className="booking-input">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@..." />
            </div>
          </div>
          <div className="booking-field">
            <label className="label-xs">Passwort</label>
            <div className="booking-input relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent cursor-pointer">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <button type="submit" className="booking-search-btn w-full">
            <LogIn size={16} /> Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}

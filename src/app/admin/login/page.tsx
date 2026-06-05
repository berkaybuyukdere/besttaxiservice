'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        sessionStorage.setItem('adminCreds', btoa(`${username}:${password}`));
        sessionStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Ungültige Anmeldedaten');
      }
    } catch {
      setError('Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-lux">
        <p className="micro lux-gold mb-2 flex items-center gap-2">
          <Lock size={12} /> Interner Zugang
        </p>
        <h1 className="text-xl font-bold mb-1 text-white">Admin Panel</h1>
        <p className="text-xs text-gray-500 mb-6">Nur autorisiertes Personal</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="lux-field">
            <label>Benutzername</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className="lux-input" />
          </div>
          <div className="lux-field">
            <label>Passwort</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="lux-input w-full"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="auth-eye">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <button type="submit" className="booking-search-btn w-full" disabled={loading}>
            <LogIn size={16} /> {loading ? '…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  );
}

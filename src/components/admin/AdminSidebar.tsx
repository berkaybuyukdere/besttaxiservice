'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  DollarSign,
  Car,
  Map,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Buchungen', icon: CalendarCheck },
  { href: '/admin/pricing', label: 'Preise', icon: DollarSign },
  { href: '/admin/vehicles', label: 'Fahrzeuge', icon: Car },
  { href: '/admin/routes', label: 'Routen', icon: Map },
  { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="admin-sidebar">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="text-base font-bold text-white admin-brand-text">
          BEST<span className="text-[var(--accent)]">TAXI</span>
        </div>
        <div className="micro mt-1 admin-brand-text" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Admin Panel
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn('admin-nav-link', pathname === href && 'active')}
            title={label}
          >
            <Icon size={18} className="shrink-0" />
            <span className="admin-nav-label">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button type="button" onClick={handleLogout} className="admin-nav-link w-full border-0 bg-transparent cursor-pointer">
          <LogOut size={18} />
          <span className="admin-nav-label">Abmelden</span>
        </button>
      </div>
    </aside>
  );
}

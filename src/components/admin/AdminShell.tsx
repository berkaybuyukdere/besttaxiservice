'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }
    if (!localStorage.getItem('adminAuth')) {
      router.replace('/admin/login');
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!ready) return null;

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}

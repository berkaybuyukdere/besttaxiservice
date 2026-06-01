'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCALES = ['de', 'en', 'fr', 'it'] as const;

const SERVICES = [
  { key: 'flughafen-abholung', label: 'Flughafen Abholung' },
  { key: 'flughafen-absetzen', label: 'Flughafen Absetzen' },
  { key: 'geschaeftsreisen', label: 'Geschäftsreisen' },
  { key: 'gruppenfahrten', label: 'Gruppenfahrten' },
  { key: 'vip-chauffeur', label: 'VIP Chauffeur' },
  { key: 'stundlicher-service', label: 'Stündlich' },
  { key: 'ski-transfer', label: 'Ski Transfer' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (loc: string) => {
    const parts = pathname.split('/');
    parts[1] = loc;
    router.push(parts.join('/') || `/${loc}`);
  };

  return (
    <div className="nav-wrapper">
      <header className={cn('nav-island', scrolled && 'scrolled')}>
        <Link href={`/${locale}`} className="site-logo">
          BEST<span>TAXI</span>SERVICE
        </Link>

        <nav className="nav-links">
          <Link href={`/${locale}/unsere-flotte`}>{t('fleet')}</Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-full hover:bg-gray-100"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit' }}
            >
              {t('services')} <ChevronDown size={12} />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 py-2 min-w-[220px] bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                onMouseLeave={() => setServicesOpen(false)}
              >
                {SERVICES.map((s) => (
                  <Link
                    key={s.key}
                    href={`/${locale}/transferdienste/${s.key}`}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={`/${locale}/preisliste`}>{t('pricing')}</Link>
          <Link href={`/${locale}/ueber-uns`}>{t('about')}</Link>
          <Link href={`/${locale}/faqs`}>{t('faq')}</Link>
          <Link href={`/${locale}/kontakt`}>{t('contact')}</Link>
        </nav>

        <div className="nav-right">
          <span className="nav-micro nav-desktop-only hidden sm:inline">ZRH · 7/24</span>
          <div className="lang-chips nav-desktop-only">
            {LOCALES.map((loc) => (
              <button key={loc} type="button" onClick={() => switchLocale(loc)} className={cn('lang-chip', locale === loc && 'active')}>
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href={`/${locale}/anmelden`} className="btn-ghost nav-desktop-only no-underline">
            {t('login')}
          </Link>
          <Link href={`/${locale}/registrieren`} className="btn-primary nav-desktop-only no-underline">
            {t('register')}
          </Link>
          <button type="button" className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="pointer-events-auto fixed left-5 right-5 top-[88px] z-[99] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl flex flex-col gap-2"
        >
          <Link href={`/${locale}/unsere-flotte`} onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium">
            {t('fleet')}
          </Link>
          <Link href={`/${locale}/preisliste`} onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium">
            {t('pricing')}
          </Link>
          <Link href={`/${locale}/kontakt`} onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium">
            {t('contact')}
          </Link>
          <div className="lang-chips pt-2">
            {LOCALES.map((loc) => (
              <button key={loc} type="button" onClick={() => { switchLocale(loc); setMobileOpen(false); }} className={cn('lang-chip', locale === loc && 'active')}>
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href={`/${locale}/anmelden`} className="btn-ghost text-center no-underline" onClick={() => setMobileOpen(false)}>
            {t('login')}
          </Link>
        </div>
      )}
    </div>
  );
}

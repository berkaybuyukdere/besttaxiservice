'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (loc: string) => {
    const parts = pathname.split('/');
    parts[1] = loc;
    router.push(parts.join('/') || `/${loc}`);
  };

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="nav-wrapper">
      <header className={cn('nav-island nav-lux', scrolled && 'scrolled')}>
        <Link href={`/${locale}`} className="site-logo">
          BEST<span>TAXI</span>SERVICE
        </Link>

        <nav className="nav-links">
          <Link href={`/${locale}/unsere-flotte`} className={isActive('unsere-flotte') ? 'active' : ''}>
            {t('fleet')}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="nav-dropdown-btn"
            >
              {t('services')} <ChevronDown size={12} />
            </button>
            {servicesOpen && (
              <div className="nav-dropdown" onMouseLeave={() => setServicesOpen(false)}>
                {SERVICES.map((s) => (
                  <Link
                    key={s.key}
                    href={`/${locale}/transferdienste/${s.key}`}
                    className="nav-dropdown-link"
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={`/${locale}/preisliste`} className={isActive('preisliste') ? 'active' : ''}>
            {t('pricing')}
          </Link>
          <Link href={`/${locale}/ueber-uns`} className={isActive('ueber-uns') ? 'active' : ''}>
            {t('about')}
          </Link>
          <Link href={`/${locale}/faqs`} className={isActive('faqs') ? 'active' : ''}>
            {t('faq')}
          </Link>
        </nav>

        <div className="nav-right">
          <span className="nav-micro nav-desktop-only">ZRH · 7/24</span>
          <div className="lang-chips nav-desktop-only">
            {LOCALES.map((loc) => (
              <button key={loc} type="button" onClick={() => switchLocale(loc)} className={cn('lang-chip', locale === loc && 'active')}>
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href={`/${locale}/kontakt`} className="btn-kontakt nav-desktop-only no-underline">
            <Phone size={14} />
            {t('contact')}
          </Link>
          <button type="button" className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="nav-mobile-menu">
          <Link href={`/${locale}/unsere-flotte`} onClick={() => setMobileOpen(false)}>{t('fleet')}</Link>
          <Link href={`/${locale}/preisliste`} onClick={() => setMobileOpen(false)}>{t('pricing')}</Link>
          <Link href={`/${locale}/kontakt`} onClick={() => setMobileOpen(false)} className="btn-kontakt text-center no-underline">
            {t('contact')}
          </Link>
          <div className="lang-chips pt-2">
            {LOCALES.map((loc) => (
              <button key={loc} type="button" onClick={() => { switchLocale(loc); setMobileOpen(false); }} className={cn('lang-chip', locale === loc && 'active')}>
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

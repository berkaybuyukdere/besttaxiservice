'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCALES = ['de', 'en', 'fr', 'it'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (loc: string) => {
    const parts = pathname.split('/');
    parts[1] = loc;
    router.push(parts.join('/') || `/${loc}`);
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              BEST<span>TAXI</span>SERVICE
            </div>
            <p className="text-sm leading-relaxed mb-4 opacity-80">{t('description')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+41763020326" className="flex items-center gap-2 no-underline hover:text-[var(--accent)]">
                <Phone size={14} /> +41 76 302 03 26
              </a>
              <a href="mailto:info@besttaxiservice.ch" className="flex items-center gap-2 no-underline hover:text-[var(--accent)]">
                <Mail size={14} /> info@besttaxiservice.ch
              </a>
              <span className="flex items-center gap-2">
                <Clock size={14} /> 7/24
              </span>
            </div>
          </div>
          <div>
            <p className="micro mb-3 text-white/50">{t('services')}</p>
            <div className="footer-links">
              <Link href={`/${locale}/transferdienste/flughafen-abholung`}>{t('airportTransfer')}</Link>
              <Link href={`/${locale}/transferdienste/vip-chauffeur`}>{t('vipChauffeur')}</Link>
              <Link href={`/${locale}/transferdienste/ski-transfer`}>{t('skiTransfer')}</Link>
            </div>
          </div>
          <div>
            <p className="micro mb-3 text-white/50">{t('routes')}</p>
            <div className="footer-links">
              <Link href={`/${locale}/routen/zuerich-flughafen-zug`}>ZRH → Zug</Link>
              <Link href={`/${locale}/routen/zuerich-flughafen-luzern`}>ZRH → Luzern</Link>
              <Link href={`/${locale}/routen/zuerich-flughafen-davos`}>ZRH → Davos</Link>
            </div>
          </div>
          <div>
            <p className="micro mb-3 text-white/50">{t('information')}</p>
            <div className="footer-links">
              <Link href={`/${locale}/ueber-uns`}>{t('aboutUs')}</Link>
              <Link href={`/${locale}/faqs`}>{t('faq')}</Link>
              <Link href={`/${locale}/kontakt`}>{t('contact')}</Link>
              <Link href={`/${locale}/preisliste`}>Preisliste</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t('copyright')}</span>
          <div className="lang-chips">
            {LOCALES.map((loc) => (
              <button key={loc} type="button" onClick={() => switchLocale(loc)} className={cn('lang-chip', locale === loc && 'active')}>
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import KontaktForm from '@/components/kontakt/KontaktForm';
import PageShell from '@/components/layout/PageShell';

const CONTACT_ITEMS = [
  { icon: Phone, label: 'Telefon', value: '+41 76 302 03 26', href: 'tel:+41763020326' },
  { icon: Mail, label: 'E-Mail', value: 'info@besttaxiservice.ch', href: 'mailto:info@besttaxiservice.ch' },
  { icon: MapPin, label: 'Adresse', value: 'Industriestrasse 14, 8302 Kloten', href: null },
  { icon: Clock, label: 'Erreichbarkeit', value: '7/24 – 365 Tage', href: null },
] as const;

export default function KontaktPage() {
  return (
    <PageShell>
      <div className="kontakt-page">
        <header className="kontakt-hero">
          <div className="hero-image-wrap" aria-hidden>
            <Image
              src="/images/besttaxi.png"
              alt=""
              fill
              sizes="100vw"
              quality={85}
              style={{ objectPosition: '70% center' }}
            />
          </div>
          <div className="kontakt-hero-inner">
            <p className="micro mb-3" style={{ color: 'var(--accent)' }}>
              Kontakt · 7/24
            </p>
            <h1>
              Wir sind <span>für Sie da</span>
            </h1>
            <p className="lead">
              Industriestrasse 14, 8302 Kloten · Zürich Flughafen — persönlich, schnell und
              zuverlässig.
            </p>
          </div>
        </header>

        <div className="kontakt-body">
          <div className="kontakt-grid">
            <div>
              <div className="kontakt-cards">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="kontakt-card">
                    <div className="icon-wrap">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <p className="label">{label}</p>
                    {href ? (
                      <a href={href} className="value">
                        {value}
                      </a>
                    ) : (
                      <p className="value">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="kontakt-form-card">
              <h2>Nachricht senden</h2>
              <p className="form-hint">
                Schreiben Sie uns – wir melden uns in der Regel innerhalb weniger Stunden.
              </p>
              <KontaktForm />
            </div>
          </div>
        </div>

        <div className="kontakt-map-bar">
          <span>Standort · Kloten ZH</span>
        </div>
        <iframe
          className="map-full"
          title="Best Taxi Service Standort"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.2!2d8.581!3d47.464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b84a8c5b3b1%3A0x0!2sIndustriestrasse%2014%2C%208302%20Kloten!5e0!3m2!1sde!2sch!4v1"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </PageShell>
  );
}

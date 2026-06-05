import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Shield, MessageCircle, Zap } from 'lucide-react';
import KontaktForm from '@/components/kontakt/KontaktForm';
import PageShell from '@/components/layout/PageShell';

const CONTACT_ITEMS = [
  { icon: Phone, label: 'Telefon', value: '+41 76 302 03 26', href: 'tel:+41763020326', hint: 'Direkt erreichbar — auch kurzfristig' },
  { icon: Mail, label: 'E-Mail', value: 'info@besttaxiservice.ch', href: 'mailto:info@besttaxiservice.ch', hint: 'Antwort in der Regel innerhalb weniger Stunden' },
  { icon: MapPin, label: 'Standort', value: 'Industriestrasse 14, 8302 Kloten', href: null, hint: 'Direkt am Flughafen Zürich' },
  { icon: Clock, label: 'Erreichbarkeit', value: '7/24 · 365 Tage', href: null, hint: 'Keine Wartezeiten am Telefon' },
] as const;

const TRUST_POINTS = [
  { icon: Shield, text: 'Fixpreis-Garantie ohne versteckte Kosten' },
  { icon: Zap, text: 'Schnelle Bestätigung — oft innerhalb von 30 Min.' },
  { icon: MessageCircle, text: 'Persönliche Betreuung auf Deutsch, EN, FR, IT' },
];

export default function KontaktPage() {
  return (
    <PageShell>
      <div className="kontakt-page kontakt-page-lux">
        <header className="kontakt-hero kontakt-hero-lux">
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
            <p className="micro mb-3 lux-gold">Kontakt · 7/24</p>
            <h1>
              Wir sind <span>für Sie da</span>
            </h1>
            <p className="lead">
              Industriestrasse 14, 8302 Kloten · Zürich Flughafen — persönlich, schnell und zuverlässig.
              Rufen Sie an, schreiben Sie uns oder buchen Sie direkt online.
            </p>
            <div className="kontakt-trust-row">
              {TRUST_POINTS.map(({ icon: Icon, text }) => (
                <span key={text} className="kontakt-trust-item">
                  <Icon size={14} /> {text}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="kontakt-body kontakt-body-lux">
          <div className="kontakt-grid kontakt-grid-lux">
            <div className="kontakt-left-lux">
              <h2 className="kontakt-section-title">Direkter Kontakt</h2>
              <p className="kontakt-section-sub">
                Unser Team ist rund um die Uhr erreichbar — für Buchungen, Änderungen und Sonderwünsche.
              </p>
              <div className="kontakt-cards kontakt-cards-lux">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, hint }) => (
                  <div key={label} className="kontakt-card kontakt-card-lux">
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
                    <p className="kontakt-card-hint">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="kontakt-form-card kontakt-form-card-lux">
              <h2>Nachricht senden</h2>
              <p className="form-hint">
                Beschreiben Sie Ihre Anfrage — Transferdatum, Route, Personenzahl oder Sonderwünsche.
                Wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <KontaktForm />
            </div>
          </div>
        </div>

        <div className="kontakt-map-bar">
          <span>Standort · Kloten ZH · 5 Min. zum Flughafen</span>
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

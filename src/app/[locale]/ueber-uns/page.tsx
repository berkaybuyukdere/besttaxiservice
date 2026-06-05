import { Shield, Clock, Star, MapPin, Phone, Mail } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';

const VALUES = [
  { icon: Shield, title: 'Fixpreis-Garantie', text: 'Keine versteckten Gebühren — der vereinbarte Preis gilt, unabhängig von Verkehr oder Wartezeit.' },
  { icon: Clock, title: '7/24 Verfügbarkeit', text: 'Früher Morgenflug oder späte Ankunft — wir sind rund um die Uhr für Sie da.' },
  { icon: Star, title: 'Premium Service', text: 'Professionelle Chauffeure, gepflegte Fahrzeuge und diskrete Betreuung auf höchstem Niveau.' },
];

export default function UeberUnsPage() {
  return (
    <PageShell>
      <div className="page-hero-sm about-hero">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2 lux-gold">Seit 2010</p>
          <h1>
            Über <span>uns</span>
          </h1>
          <p>Ihr Partner für erstklassige Flughafentransfers ab Zürich — persönlich, zuverlässig, transparent.</p>
        </div>
      </div>

      <section className="section about-section-lux">
        <div className="about-stats-row">
          <div className="about-stat-card">
            <div className="about-stat-num">15+</div>
            <p>Jahre Erfahrung im Flughafentransfer</p>
          </div>
          <div className="about-stat-card accent">
            <div className="about-stat-num">5.0★</div>
            <p>Google Bewertung · 4.8 TrustPilot</p>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-num">7/24</div>
            <p>Verfügbar an 365 Tagen im Jahr</p>
          </div>
        </div>

        <div className="about-content-grid">
          <div className="about-story">
            <h2>Best Taxi Service</h2>
            <p>
              Seit über 15 Jahren verbinden wir Reisende mit Zürich Flughafen — pünktlich, komfortabel und
              zu garantierten Fixpreisen. Unser Team aus erfahrenen Chauffeuren und Premium-Fahrzeugen steht
              für Schweizer Zuverlässigkeit und internationale Standards.
            </p>
            <p>
              Ob Geschäftsreise, Familienurlaub oder VIP-Transfer: Wir holen Sie ab, wo Sie sind — und bringen
              Sie sicher ans Ziel. Gratis Baby- und Kindersitze, Flugtracking und persönliche Betreuung sind
              selbstverständlich.
            </p>
            <div className="about-contact-inline">
              <span><MapPin size={14} /> Industriestrasse 14, 8302 Kloten</span>
              <span><Phone size={14} /> +41 76 302 03 26</span>
              <span><Mail size={14} /> info@besttaxiservice.ch</span>
            </div>
          </div>

          <div className="about-values">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="about-value-card">
                <div className="about-value-icon">
                  <Icon size={18} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

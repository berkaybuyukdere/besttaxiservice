import { ChevronDown } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';

const FAQS = [
  { q: 'Wie buche ich ein Taxi?', a: 'Nutzen Sie das horizontale Buchungsformular auf der Startseite oder rufen Sie uns an: +41 76 302 03 26.' },
  { q: 'Sind die Preise Fixpreise?', a: 'Ja – garantierte Fixpreise ohne Taxameter und ohne versteckte Gebühren.' },
  { q: 'Sind Kindersitze kostenlos?', a: 'Baby- und Kindersitze sind auf Anfrage vollständig kostenlos.' },
  { q: 'Was passiert bei Flugverspätungen?', a: 'Wir verfolgen Ihren Flug und passen die Abholzeit automatisch an.' },
  { q: 'Welche Zahlungsmethoden?', a: 'Kreditkarte, Bargeld oder Rechnung für Firmenkunden.' },
  { q: 'Gleichtag-Buchung?', a: 'Möglich – erfordert Admin-Bestätigung innerhalb von 30 Minuten.' },
  { q: 'Wie weit im Voraus buchen?', a: 'Mindestens 24 Stunden empfohlen; Gleichtag je nach Verfügbarkeit.' },
  { q: 'Nachts und Feiertags?', a: '7/24, 365 Tage im Jahr verfügbar.' },
];

export default function FAQsPage() {
  return (
    <PageShell>
      <div className="page-hero-sm">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2" style={{ color: 'var(--accent)' }}>Hilfe</p>
          <h1>
            Häufig gestellte <span>Fragen</span>
          </h1>
        </div>
      </div>
      <section className="section max-w-3xl">
        <div className="grid gap-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="admin-card group">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-sm list-none">
                {faq.q}
                <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
              </summary>
              <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

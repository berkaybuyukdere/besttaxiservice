'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Search, Download, ArrowRight, MapPin, Plane } from 'lucide-react';
import { PRICING_DATA, REGIONS } from '@/lib/pricing-data';
import { cn } from '@/lib/utils';

export default function PreislisteClient() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const router = useRouter();

  const [selectedRegions, setSelectedRegions] = useState<string[]>([REGIONS[0]]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRegion = (region: string) => {
    const isSelected = selectedRegions.includes(region);
    if (isSelected) {
      setSelectedRegions((prev) => prev.filter((r) => r !== region));
      const locs = PRICING_DATA.filter((p) => p.region === region).map((p) => p.location);
      setSelectedLocations((prev) => prev.filter((l) => !locs.includes(l)));
    } else {
      setSelectedRegions((prev) => [...prev, region]);
    }
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const availableLocations = useMemo(
    () =>
      PRICING_DATA.filter(
        (p) =>
          selectedRegions.includes(p.region) &&
          (searchQuery === '' || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [selectedRegions, searchQuery]
  );

  const filteredResults = useMemo(() => {
    if (selectedLocations.length > 0) {
      return PRICING_DATA.filter((p) => selectedLocations.includes(p.location));
    }
    if (searchQuery) {
      return PRICING_DATA.filter((p) => p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedRegions.length > 0) {
      return PRICING_DATA.filter((p) => selectedRegions.includes(p.region));
    }
    return [];
  }, [selectedLocations, selectedRegions, searchQuery]);

  return (
    <>
      <div className="page-hero-sm">
        <div className="section" style={{ padding: 0 }}>
          <p className="micro mb-2" style={{ color: 'var(--accent)' }}>
            Transparent · Fixpreis
          </p>
          <h1>
            {t('title').split(' ')[0]} <span>{t('title').split(' ').slice(1).join(' ') || 'Preise'}</span>
          </h1>
          <p>{t('subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="preisliste-layout">
          <aside className="preisliste-sidebar">
            <p className="label-xs mb-3 flex items-center gap-2">
              <MapPin size={12} /> Region wählen
            </p>
            <div className="booking-input mb-4">
              <Search size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
              />
            </div>
            {REGIONS.map((region) => (
              <label key={region} className="region-chip">
                <input type="checkbox" checked={selectedRegions.includes(region)} onChange={() => toggleRegion(region)} />
                {region}
              </label>
            ))}

            {selectedRegions.length > 0 && availableLocations.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <p className="label-xs">{t('selectLocations')}</p>
                  <button type="button" className="text-[10px] font-bold text-[var(--accent-dark)]" onClick={() => setSelectedLocations(availableLocations.map((l) => l.location))}>
                    {t('selectAll')}
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {availableLocations.map((entry) => (
                    <label key={entry.location} className="region-chip text-xs">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(entry.location)}
                        onChange={() => toggleLocation(entry.location)}
                      />
                      {entry.location}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <div>
            {filteredResults.length === 0 ? (
              <div className="admin-card text-center py-16">
                <Plane size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">{t('noSelection')}</p>
              </div>
            ) : (
              <div className="preisliste-table-wrap">
                <div className="flex justify-between items-center px-5 py-4 bg-gray-100 border-b border-gray-200">
                  <span className="text-sm font-semibold">
                    {filteredResults.length} Destinationen
                  </span>
                  <button type="button" className="btn-ghost text-xs flex items-center gap-1" onClick={() => window.print()}>
                    <Download size={12} /> {t('printExport')}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="preisliste-table">
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th>{t('taxiToAirport')}</th>
                        <th>{t('vanToAirport')}</th>
                        <th>{t('taxiToZurich')}</th>
                        <th>{t('vanToZurich')}</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((entry) => (
                        <tr key={`${entry.region}-${entry.location}`}>
                          <td>
                            <div className="font-semibold">{entry.location}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">{entry.region}</div>
                          </td>
                          <td className="price-cell">
                            <span>CHF {entry.taxiToAirport}</span>
                          </td>
                          <td className="price-cell">
                            <span>CHF {entry.vanToAirport}</span>
                          </td>
                          <td className="price-cell">
                            <span>CHF {entry.taxiToZurich}</span>
                          </td>
                          <td className="price-cell">
                            <span>CHF {entry.vanToZurich}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-accent text-xs py-2 px-3"
                              onClick={() =>
                                router.push(
                                  `/${locale}/booking/search?to=${encodeURIComponent(entry.location)}&price=${entry.taxiToAirport}`
                                )
                              }
                            >
                              {t('bookNow')} <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

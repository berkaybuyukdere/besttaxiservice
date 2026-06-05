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
          <p className="micro mb-2 lux-gold">Transparent · Fixpreis</p>
          <h1>
            {t('title').split(' ')[0]} <span>{t('title').split(' ').slice(1).join(' ') || 'Preise'}</span>
          </h1>
          <p>{t('subtitle')}</p>
        </div>
      </div>

      <section className="section preisliste-section-lux">
        <div className="preisliste-layout-lux">
          <aside className="preisliste-sidebar-lux">
            <p className="admin-label mb-3 flex items-center gap-2">
              <MapPin size={12} /> Region wählen
            </p>
            <div className="preisliste-search-lux">
              <Search size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
              />
            </div>
            <div className="preisliste-regions">
              {REGIONS.map((region) => (
                <label key={region} className={cn('region-chip-lux', selectedRegions.includes(region) && 'active')}>
                  <input type="checkbox" checked={selectedRegions.includes(region)} onChange={() => toggleRegion(region)} />
                  {region}
                </label>
              ))}
            </div>

            {selectedRegions.length > 0 && availableLocations.length > 0 && (
              <div className="preisliste-locations">
                <div className="preisliste-locations-head">
                  <p className="admin-label">{t('selectLocations')}</p>
                  <button
                    type="button"
                    className="preisliste-select-all"
                    onClick={() => setSelectedLocations(availableLocations.map((l) => l.location))}
                  >
                    {t('selectAll')}
                  </button>
                </div>
                <div className="preisliste-locations-list">
                  {availableLocations.map((entry) => (
                    <label key={entry.location} className="region-chip-lux small">
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

          <div className="preisliste-main-lux">
            {filteredResults.length === 0 ? (
              <div className="preisliste-empty">
                <Plane size={40} />
                <p>{t('noSelection')}</p>
              </div>
            ) : (
              <div className="preisliste-table-wrap-lux">
                <div className="preisliste-table-head">
                  <span>{filteredResults.length} Destinationen</span>
                  <button type="button" className="btn-ghost-lux" onClick={() => window.print()}>
                    <Download size={12} /> {t('printExport')}
                  </button>
                </div>
                <div className="preisliste-table-scroll">
                  <table className="preisliste-table-lux">
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
                            <div className="dest-name">{entry.location}</div>
                            <div className="dest-region">{entry.region}</div>
                          </td>
                          <td className="price-val">CHF {entry.taxiToAirport}</td>
                          <td className="price-val">CHF {entry.vanToAirport}</td>
                          <td className="price-val">CHF {entry.taxiToZurich}</td>
                          <td className="price-val">CHF {entry.vanToZurich}</td>
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

'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { isToday } from '@/lib/utils';
import LuxDatePicker from '@/components/booking/LuxDatePicker';
import LocationAutocomplete from '@/components/booking/LocationAutocomplete';

type TabType = 'distance' | 'hourly' | 'check';

const DEFAULT_FROM = 'Zürich Flughafen (ZRH)';

export default function BookingCard() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('distance');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:00');
  const [arrivalTime, setArrivalTime] = useState('10:00');
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_FROM);
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState('');

  const isSameDay = pickupDate ? isToday(new Date(pickupDate)) : false;

  const handleCheck = async () => {
    const num = bookingId.trim().toUpperCase();
    if (!num) return;
    setCheckLoading(true);
    setCheckError('');
    try {
      const res = await fetch(`/api/booking/lookup?number=${encodeURIComponent(num)}`);
      const data = await res.json();
      if (!res.ok) {
        setCheckError(data.error || 'Nicht gefunden');
        return;
      }
      router.push(`/${locale}/booking/status?number=${encodeURIComponent(num)}`);
    } catch {
      setCheckError('Verbindungsfehler');
    } finally {
      setCheckLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === 'check') {
      handleCheck();
      return;
    }
    const params = new URLSearchParams({
      date: pickupDate,
      time: pickupTime,
      from: pickupLocation,
      to: dropoffLocation,
      type: activeTab,
    });
    router.push(`/${locale}/booking/search?${params.toString()}`);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'distance', label: t('tabDistance') },
    { id: 'hourly', label: t('tabHourly') },
    { id: 'check', label: t('tabCheck') },
  ];

  return (
    <div className="booking-lux">
      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn('booking-tab', activeTab === tab.id && 'active')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'check' ? (
        <div className="booking-lux-grid booking-lux-grid-check">
          <div className="booking-field booking-field-wide">
            <label>{t('bookingIdLabel')}</label>
            <div className="lux-input-wrap">
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                placeholder="RES-12345"
                className="lux-input"
              />
            </div>
            {checkError && <p className="lux-error">{checkError}</p>}
          </div>
          <button type="button" className="booking-search-btn" onClick={handleCheck} disabled={checkLoading}>
            {checkLoading ? '…' : t('checkButton')}
          </button>
        </div>
      ) : (
        <>
          <div className={cn('booking-lux-grid', activeTab === 'hourly' && 'booking-lux-grid-hourly')}>
            <div className="booking-field">
              <LuxDatePicker value={pickupDate} onChange={setPickupDate} label={t('dateLabel')} />
            </div>
            <div className="booking-field">
              <label>{t('timeLabel')}</label>
              <div className="lux-input-wrap">
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="lux-input"
                />
              </div>
            </div>
            {activeTab === 'hourly' && (
              <div className="booking-field">
                <label>{t('arrivalLabel')}</label>
                <div className="lux-input-wrap">
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="lux-input"
                  />
                </div>
              </div>
            )}
            <div className="booking-field booking-field-wide">
              <label>{t('fromLabel')}</label>
              <div className="lux-input-wrap">
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={t('fromPlaceholder')}
                  className="lux-input"
                />
              </div>
            </div>
            {activeTab === 'distance' && (
              <div className="booking-field booking-field-wide">
                <LocationAutocomplete
                  label={t('toLabel')}
                  value={dropoffLocation}
                  onChange={setDropoffLocation}
                  placeholder={t('toPlaceholder')}
                />
              </div>
            )}
            <button type="button" className="booking-search-btn" onClick={handleSearch}>
              {t('searchButton')}
            </button>
          </div>
          {isSameDay && <div className="same-day-banner">{t('sameDayWarning')}</div>}
        </>
      )}
    </div>
  );
}

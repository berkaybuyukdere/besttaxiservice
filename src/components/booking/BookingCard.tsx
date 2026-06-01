'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  MapPinCheck,
  Search,
  AlertTriangle,
  Route,
  Timer,
  FileSearch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { isToday } from '@/lib/utils';

type TabType = 'distance' | 'hourly' | 'check';

export default function BookingCard() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('distance');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:00');
  const [arrivalTime, setArrivalTime] = useState('10:00');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [bookingId, setBookingId] = useState('');

  const isSameDay = pickupDate ? isToday(new Date(pickupDate)) : false;

  const handleSearch = () => {
    if (activeTab === 'check') {
      router.push(`/${locale}/booking/search?id=${bookingId}`);
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

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'distance', label: t('tabDistance'), icon: <Route size={14} /> },
    { id: 'hourly', label: t('tabHourly'), icon: <Timer size={14} /> },
    { id: 'check', label: t('tabCheck'), icon: <FileSearch size={14} /> },
  ];

  return (
    <div className="booking-horizontal">
      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn('booking-tab', activeTab === tab.id && 'active')}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'check' ? (
        <div className="booking-row">
          <div className="booking-field" style={{ flex: 2 }}>
            <label>
              <FileSearch size={12} /> {t('bookingIdLabel')}
            </label>
            <div className="booking-input">
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder={t('bookingIdPlaceholder')}
              />
            </div>
          </div>
          <button type="button" className="booking-search-btn" onClick={handleSearch}>
            <Search size={16} /> {t('checkButton')}
          </button>
        </div>
      ) : (
        <>
          <div className="booking-row">
            <div className="booking-field sm">
              <label>
                <Calendar size={12} /> {t('dateLabel')}
              </label>
              <div className="booking-input">
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
              </div>
            </div>
            <div className="booking-field sm">
              <label>
                <Clock size={12} /> {t('timeLabel')}
              </label>
              <div className="booking-input">
                <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
              </div>
            </div>
            {activeTab === 'hourly' && (
              <div className="booking-field sm">
                <label>
                  <Clock size={12} /> {t('arrivalLabel')}
                </label>
                <div className="booking-input">
                  <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
                </div>
              </div>
            )}
            <div className="booking-field">
              <label>
                <MapPin size={12} /> {t('fromLabel')}
              </label>
              <div className="booking-input">
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={t('fromPlaceholder')}
                />
              </div>
            </div>
            {activeTab === 'distance' && (
              <div className="booking-field">
                <label>
                  <MapPinCheck size={12} /> {t('toLabel')}
                </label>
                <div className="booking-input">
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder={t('toPlaceholder')}
                  />
                </div>
              </div>
            )}
            <button type="button" className="booking-search-btn" onClick={handleSearch}>
              <Search size={16} /> {t('searchButton')}
            </button>
          </div>
          {isSameDay && (
            <div className="same-day-banner">
              <AlertTriangle size={14} />
              {t('sameDayWarning')}
            </div>
          )}
        </>
      )}
    </div>
  );
}

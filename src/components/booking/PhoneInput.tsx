'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PHONE_COUNTRIES,
  flagEmoji,
  formatPhoneNumber,
  type PhoneCountry,
} from '@/lib/phone-countries';

type PhoneInputProps = {
  dialCode: string;
  localNumber: string;
  onDialCodeChange: (dial: string) => void;
  onLocalNumberChange: (value: string) => void;
  label?: string;
  error?: string;
};

export default function PhoneInput({
  dialCode,
  localNumber,
  onDialCodeChange,
  onLocalNumberChange,
  label,
  error,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const selected = PHONE_COUNTRIES.find((c) => c.dial === dialCode) ?? PHONE_COUNTRIES[0];

  const fullNumber = useMemo(() => formatPhoneNumber(dialCode, localNumber), [dialCode, localNumber]);

  const pickCountry = (country: PhoneCountry) => {
    onDialCodeChange(country.dial);
    setOpen(false);
  };

  return (
    <div className="phone-input-field">
      {label && <label>{label}</label>}
      <div className={cn('phone-input-wrap', error && 'has-error')}>
        <div className="phone-country-picker">
          <button
            type="button"
            className="phone-country-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Landesvorwahl wählen"
          >
            <span className="phone-flag" aria-hidden>
              {flagEmoji(selected.code)}
            </span>
            <span className="phone-dial">{selected.dial}</span>
            <ChevronDown size={14} className={cn('phone-chevron', open && 'open')} />
          </button>
          {open && (
            <ul className="phone-country-menu" role="listbox">
              {PHONE_COUNTRIES.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={country.dial === dialCode}
                    className={cn('phone-country-option', country.dial === dialCode && 'active')}
                    onClick={() => pickCountry(country)}
                  >
                    <span className="phone-flag">{flagEmoji(country.code)}</span>
                    <span className="phone-country-name">{country.name}</span>
                    <span className="phone-dial">{country.dial}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className="lux-input phone-local-input"
          value={localNumber}
          onChange={(e) => onLocalNumberChange(e.target.value.replace(/[^\d\s]/g, ''))}
          placeholder="76 302 03 26"
        />
      </div>
      {fullNumber && <p className="phone-preview">{fullNumber}</p>}
      {error && <p className="lux-error">{error}</p>}
    </div>
  );
}

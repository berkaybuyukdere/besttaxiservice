'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { searchSwissLocations } from '@/lib/swiss-locations';
import { cn } from '@/lib/utils';

type LocationAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

export default function LocationAutocomplete({ value, onChange, placeholder, label }: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const suggestions = searchSwissLocations(value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pick = (loc: string) => {
    onChange(loc);
    setOpen(false);
  };

  return (
    <div className="lux-autocomplete" ref={ref}>
      {label && <label>{label}</label>}
      <div className="lux-input-wrap lux-input-with-icon">
        <MapPin size={14} className="lux-input-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open || suggestions.length === 0) return;
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlight((h) => (h + 1) % suggestions.length);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === 'Enter' && suggestions[highlight]) {
              e.preventDefault();
              pick(suggestions[highlight]);
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          className="lux-input"
          autoComplete="off"
        />
      </div>
      {open && suggestions.length > 0 && (
        <ul className="lux-suggestions" role="listbox">
          {suggestions.map((loc, i) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={i === highlight}
                className={cn('lux-suggestion-item', i === highlight && 'active')}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(loc)}
                onMouseEnter={() => setHighlight(i)}
              >
                <MapPin size={12} />
                {loc}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

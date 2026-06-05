'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { de } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import 'react-day-picker/style.css';

type LuxDatePickerProps = {
  value: string;
  onChange: (isoDate: string) => void;
  label?: string;
};

export default function LuxDatePicker({ value, onChange, label }: LuxDatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = value ? parseISO(value) : undefined;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="lux-date-field" ref={ref}>
      {label && <span className="lux-field-label">{label}</span>}
      <button
        type="button"
        className={cn('lux-date-trigger', open && 'open')}
        onClick={() => setOpen(!open)}
      >
        {selected ? format(selected, 'dd.MM.yyyy', { locale: de }) : 'Datum wählen'}
      </button>
      {open && (
        <div className="lux-date-popover">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(day) => {
              if (day) {
                onChange(format(day, 'yyyy-MM-dd'));
                setOpen(false);
              }
            }}
            locale={de}
            disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
            className="lux-calendar"
          />
        </div>
      )}
    </div>
  );
}

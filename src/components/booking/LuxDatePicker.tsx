'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selected = value ? parseISO(value) : undefined;

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      left: rect.left,
      width: Math.max(rect.width, 300),
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const popover =
    open &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={popoverRef}
        className="lux-date-popover lux-date-popover-portal"
        style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
      >
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
      </div>,
      document.body
    );

  return (
    <div className="lux-date-field">
      {label && <span className="lux-field-label">{label}</span>}
      <button
        ref={triggerRef}
        type="button"
        className={cn('lux-date-trigger', open && 'open')}
        onClick={() => setOpen(!open)}
      >
        {selected ? format(selected, 'dd.MM.yyyy', { locale: de }) : 'Datum wählen'}
      </button>
      {popover}
    </div>
  );
}

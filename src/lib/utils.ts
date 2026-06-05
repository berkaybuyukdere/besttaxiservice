import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function generateBookingNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `RES-${num}`;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function generateSecureToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(array);
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

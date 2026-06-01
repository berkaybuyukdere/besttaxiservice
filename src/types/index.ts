export type Locale = 'de' | 'en' | 'fr' | 'it';

export interface PricingEntry {
  id: string;
  region: string;
  location: string;
  taxiToAirport: number;
  vanToAirport: number;
  taxiToZurich: number;
  vanToZurich: number;
}

export interface BookingFormData {
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType?: 'BUSINESS_FAMILY' | 'VIP_ULTRA_COMFORT' | 'PREMIUM_CLASS';
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  flightNumber?: string;
  specialRequests?: string;
  paymentMethod?: 'CARD' | 'CASH' | 'INVOICE';
  price?: number;
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  capacity: number;
  luggageCapacity: number;
  imageUrl?: string;
  priceMultiplier: number;
  vehicleType: string;
  isActive: boolean;
}

export const REGIONS = [
  'WINTERTHUR',
  'ZÜRICH OBERLAND',
  'GOLDKÜSTE',
  'RECHTE ZÜRICH-SEESEITE',
  'KANTON SCHWYZ',
  'KANTON ZUG',
] as const;

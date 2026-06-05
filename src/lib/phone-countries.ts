export type PhoneCountry = {
  code: string;
  dial: string;
  name: string;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'CH', dial: '+41', name: 'Schweiz' },
  { code: 'DE', dial: '+49', name: 'Deutschland' },
  { code: 'AT', dial: '+43', name: 'Österreich' },
  { code: 'FR', dial: '+33', name: 'Frankreich' },
  { code: 'IT', dial: '+39', name: 'Italien' },
  { code: 'LI', dial: '+423', name: 'Liechtenstein' },
  { code: 'GB', dial: '+44', name: 'United Kingdom' },
  { code: 'US', dial: '+1', name: 'United States' },
  { code: 'TR', dial: '+90', name: 'Türkiye' },
  { code: 'NL', dial: '+31', name: 'Niederlande' },
  { code: 'BE', dial: '+32', name: 'Belgien' },
  { code: 'ES', dial: '+34', name: 'Spanien' },
  { code: 'PT', dial: '+351', name: 'Portugal' },
  { code: 'PL', dial: '+48', name: 'Polen' },
  { code: 'CZ', dial: '+420', name: 'Tschechien' },
  { code: 'HU', dial: '+36', name: 'Ungarn' },
  { code: 'HR', dial: '+385', name: 'Kroatien' },
  { code: 'GR', dial: '+30', name: 'Griechenland' },
  { code: 'SE', dial: '+46', name: 'Schweden' },
  { code: 'NO', dial: '+47', name: 'Norwegen' },
  { code: 'DK', dial: '+45', name: 'Dänemark' },
  { code: 'FI', dial: '+358', name: 'Finnland' },
  { code: 'LU', dial: '+352', name: 'Luxemburg' },
  { code: 'IE', dial: '+353', name: 'Irland' },
  { code: 'RO', dial: '+40', name: 'Rumänien' },
  { code: 'BG', dial: '+359', name: 'Bulgarien' },
  { code: 'RS', dial: '+381', name: 'Serbien' },
  { code: 'AE', dial: '+971', name: 'VAE' },
  { code: 'SA', dial: '+966', name: 'Saudi-Arabien' },
  { code: 'CN', dial: '+86', name: 'China' },
  { code: 'JP', dial: '+81', name: 'Japan' },
  { code: 'IN', dial: '+91', name: 'Indien' },
  { code: 'RU', dial: '+7', name: 'Russland' },
];

export function flagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function formatPhoneNumber(dialCode: string, localNumber: string): string {
  const digits = localNumber.replace(/\D/g, '');
  if (!digits) return '';
  return `${dialCode}${digits}`;
}

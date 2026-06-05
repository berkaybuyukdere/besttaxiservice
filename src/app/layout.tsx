import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Best Taxi Service – Zürich Flughafen Taxi & Limousine',
  description: 'Premium Flughafentransfer ab Zürich. Fixpreise, professionelle Fahrer, 7/24 verfügbar.',
  icons: {
    icon: '/images/fleet/sklasse.png',
    shortcut: '/images/fleet/sklasse.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

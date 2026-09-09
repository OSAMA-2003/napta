import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Cairo } from 'next/font/google';
import './globals.css';
import '@/i18n';
import { NabtaProvider } from '@/context/NabtaContext';
import { TelemetryTicker } from '@/components/layout/TelemetryTicker';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-headline',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const cairo = Cairo({
  variable: '--font-arabic',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'NABTA — Global Agronomic Intelligence & Marketplace Platform',
  description:
    'The Operating System for Precision Agriculture & Global Input Sourcing. Combining multi-spectral satellite telemetry, chemical soil modeling, and stochastic yield forecasting.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface overflow-x-hidden">
        <NabtaProvider>
          <TelemetryTicker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NabtaProvider>
      </body>
    </html>
  );
}

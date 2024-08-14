import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Locale, i18n } from '@/i18n.config';
import { Toaster } from '@/components/ui/toaster';
import { LocationProvider } from '@/context/LocationProvider';
import { ProgressBar } from '@/components/ProgressBar';
import { Analytics } from '@vercel/analytics/react';
import DarkIcon from '../../../public/images/logo-light.png';
import LightIcon from '../../../public/images/logo-black.png';

import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'Velago',
  description:
    'Use Velago to search for healthcare providers and charitable organizations near you',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: LightIcon.src,
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: DarkIcon.src,
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontHeading = localFont({
  src: '../../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
  display: 'swap',
});
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <ProgressBar />
          <LocationProvider>
            <Header lang={params.lang} />
            <main className="min-h-[90.75vh] flex-1">{children}</main>
            <Toaster />
            <Footer lang={params.lang} />
          </LocationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

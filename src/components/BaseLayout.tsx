'use server';

import { LocationProvider } from '@/app/context/LocationProvider';
import ThemeDataProvider from '@/app/context/ThemeProvider';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Locale } from '@/types';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Inter, Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';

interface BaseLayoutProps {
  children: ReactNode;
  locale: Locale;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '500',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '300',
  variable: '--font-roboto',
});

export default async function BaseLayout({
  children,
  locale,
}: BaseLayoutProps) {
  const messages = await getMessages();

  return (
    <html
      className={`${inter.variable} ${roboto.variable}`}
      lang={locale}
      suppressHydrationWarning
    >
      <body className={cn('flex min-h-screen flex-col antialiased')}>
        <NextIntlClientProvider messages={messages}>
          <NextThemesProvider
            attribute={'class'}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeDataProvider>
              <LocationProvider>
                <ProgressBar />
                <Header />
                <main className="flex flex-1 flex-col p-4">{children}</main>
                <Footer />
              </LocationProvider>
            </ThemeDataProvider>
          </NextThemesProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

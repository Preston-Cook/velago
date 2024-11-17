import { ThemeProvider } from '@/app/context/ThemeProvider';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Locale } from '@/types';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface BaseLayoutProps {
  children: ReactNode;
  locale: Locale;
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function BaseLayout({
  children,
  locale,
}: BaseLayoutProps) {
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

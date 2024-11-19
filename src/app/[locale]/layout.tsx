import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import { Locale } from '@/types';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Velago',
  description:
    'Use Velago to search for healthcare providers and charitable organizations near you',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  const validLocales: string[] = [...routing.locales];

  if (!validLocales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <BaseLayout locale={locale as Locale}>{children}</BaseLayout>;
}

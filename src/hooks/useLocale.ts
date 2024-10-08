'use client';

import { i18n } from '@/i18n.config';
import { usePathname } from 'next/navigation';

export function useLocale() {
  const path = usePathname();
  let locale = path.split('/')[1];

  // if path is using default locale, locale will not be in accepted languages
  locale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;

  return { locale };
}

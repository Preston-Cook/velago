import type { Locale } from '@/i18n.config';
import { i18n } from '@/i18n.config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[
    (!i18n.locales.includes(locale)
      ? i18n.defaultLocale
      : locale) as keyof typeof dictionaries
  ]();
};

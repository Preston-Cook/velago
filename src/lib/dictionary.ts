import type { Locale } from '@/i18n.config';
import { i18n } from '@/i18n.config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!i18n.locales.includes(locale)) {
    return null;
  }
  return dictionaries[locale as keyof typeof dictionaries]();
};

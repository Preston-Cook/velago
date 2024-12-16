import { supportedLocales } from '@/config/locales';
import { NextRequest } from 'next/server';

const supportedLocaleArr: string[] = supportedLocales;

export function getLocaleFromHeaders(req: NextRequest) {
  const acceptLanguage = req.headers.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q] = lang.trim().split(';q=');
        return {
          locale: code.split('-')[0],
          quality: q ? parseFloat(q) : 1,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    const detectedLocale = languages.find((lang) =>
      supportedLocaleArr.includes(lang.locale),
    )?.locale;

    return detectedLocale || 'en';
  }

  return 'en';
}

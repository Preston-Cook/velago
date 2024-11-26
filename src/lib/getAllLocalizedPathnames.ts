import { supportedLocales } from '@/config/locales';
import { getLocalizedPathname } from '@/lib/getLocalizedPathname';
import { PathnameConfig } from '@/types';

export function getAllLocalizedPathnames(pathname: keyof PathnameConfig) {
  return supportedLocales.map((locale) =>
    getLocalizedPathname(pathname, locale),
  );
}

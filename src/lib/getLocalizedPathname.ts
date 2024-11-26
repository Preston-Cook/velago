import { pathnameLocaleMappings } from '@/config/locales';
import { Locale, PathnameConfig } from '@/types';

export function getLocalizedPathname(
  pathname: keyof PathnameConfig,
  locale: Locale,
) {
  return `/${locale}${pathname === '/' ? '' : pathnameLocaleMappings[pathname][locale]}`;
}

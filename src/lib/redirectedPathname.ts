import { i18n } from '../../i18.config';

export default function redirectedPathName(locale: string, pathName: string) {
  if (!pathName) return '/';

  const pathnameIsMissingLocale = i18n.locales.every(
    (loc) => !pathName.startsWith(`/${loc}/`) && pathName !== `/${loc}`,
  );

  if (pathnameIsMissingLocale) {
    if (locale === i18n.defaultLocale) return pathName;
    return `/${locale}${pathName}`;
  }
  if (locale === i18n.defaultLocale) {
    const segments = pathName.split('/');
    const isHome = segments.length === 2;
    if (isHome) return '/';

    segments.splice(1, 1);
    return segments.join('/');
  }

  const segments = pathName.split('/');
  segments[1] = locale;
  return segments.join('/');
}

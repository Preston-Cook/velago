import {
  defaultLocale,
  pathnameLocaleMappings,
  supportedLocales,
} from '@/config/locales';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale: defaultLocale,
  pathnames: pathnameLocaleMappings,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

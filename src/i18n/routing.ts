import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/map': {
      en: '/map',
      es: '/mapa',
    },
    '/contact': {
      en: '/contact',
      es: '/contacto',
    },
    '/about': {
      en: '/about',
      es: '/acerca-de',
    },
    '/privacy': {
      en: '/privacy',
      es: '/privacidad',
    },
    '/disclaimer': {
      en: '/disclaimer',
      es: '/descargo-de-responsabilidad',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

import { Locale } from '@/types';

export const pathnameLocaleMappings = {
  '/': {
    en: '/',
    es: '/',
  },
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
  '/signin/user': {
    en: '/signin/user',
    es: '/iniciar-sesion/usuario',
  },
  '/signin/organization': {
    en: '/signin/organization',
    es: '/iniciar-sesion/organizacion',
  },
  '/signup/user': {
    en: '/signup/user',
    es: '/registrarse/usuario',
  },
  '/signup/organization': {
    en: '/signup/organization',
    es: '/registrarse/organizacion',
  },
  '/profile': {
    en: '/profile',
    es: '/perfil',
  },
  '/account': {
    en: '/account',
    es: '/cuenta',
  },
  '/dashboard': {
    en: '/dashboard',
    es: '/tablero',
  },
  '/settings': {
    en: '/settings',
    es: '/configuracion',
  },
  '/unauthorized': {
    en: '/unauthorized',
    es: '/no-autorizado',
  },
};

export const defaultLocale = 'en' as const;

export const supportedLocales: Locale[] = ['en', 'es'];

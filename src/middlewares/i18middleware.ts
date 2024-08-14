import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from '../i18n.config';
import { CustomMiddleware } from '@/types/CustomMiddleware';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const { locales } = i18n;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function i18Middleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { pathname, href } = request.nextUrl;

    // ignore internationalization on api routes
    if (href.split('/').at(3) === 'api') {
      return middleware(request, event, response);
    }

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);

      const redirectUrl = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ).toString();

      const headerName =
        locale === i18n.defaultLocale
          ? 'x-redirect-helper-default'
          : 'x-redirect-helper';

      request.headers.set(headerName, redirectUrl);
    }

    return middleware(request, event, response);
  };
}

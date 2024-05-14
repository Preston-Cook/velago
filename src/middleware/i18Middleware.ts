import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import type { CustomMiddleware } from '@/types/CustomMiddleware';
import { getLocale } from '@/lib/getLocale';
import { i18n } from '../../i18.config';

export function i18Middleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { pathname, href } = request.nextUrl;

    if (href.split('/').includes('api')) {
      return middleware(request, event, response);
    }

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);

      if (locale === i18n.defaultLocale) {
        return NextResponse.rewrite(
          new URL(
            `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
            request.url,
          ),
        );
      }

      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url,
        ),
      );
    }

    return middleware(request, event, response);
  };
}

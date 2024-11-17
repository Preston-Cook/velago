import { routing } from '@/i18n/routing';
import { apiPathnameRegex } from '@/lib/regex';
import { CustomMiddleware } from '@/types';
import createMiddleware from 'next-intl/middleware';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function i18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { pathname } = request.nextUrl;
    let modifiedResponse;

    if (!apiPathnameRegex.test(pathname)) {
      const nextIntlMiddleware = createMiddleware(routing);
      modifiedResponse = nextIntlMiddleware(request);
    } else {
      modifiedResponse = response;
    }

    return middleware(request, event, modifiedResponse);
  };
}

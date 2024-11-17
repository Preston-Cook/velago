import { routing } from '@/i18n/routing';
import { CustomMiddleware } from '@/types';
import createMiddleware from 'next-intl/middleware';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function i18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Ensure that middleware runs on routes with locale prefix
    const nextIntlMiddleware = createMiddleware(routing);
    response = nextIntlMiddleware(request);

    return middleware(request, event, response);
  };
}

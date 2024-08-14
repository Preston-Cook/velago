import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { CustomMiddleware } from '@/types/CustomMiddleware';

export function redirectMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const defaultUrl = request.headers.get('x-redirect-helper-default');
    const alternateLocaleUrl = request.headers.get('x-redirect-helper');

    if (defaultUrl !== null) {
      return NextResponse.rewrite(defaultUrl);
    } else if (alternateLocaleUrl !== null) {
      return NextResponse.redirect(alternateLocaleUrl);
    }

    return middleware(request, event, response);
  };
}

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

    // reqs at this point will not be api requests

    // TODO: Add protection for standard routes

    if (defaultUrl !== null) {
      return NextResponse.rewrite(defaultUrl);
    } else if (alternateLocaleUrl !== null) {
      return NextResponse.redirect(alternateLocaleUrl);
    }

    return middleware(request, event, response);
  };
}

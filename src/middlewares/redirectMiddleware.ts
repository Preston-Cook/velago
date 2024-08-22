import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { CustomMiddleware } from '@/types/CustomMiddleware';
import { createSbServerClient } from '@/lib/sbServerClient';
import { protectedRoutes } from '@/config/protectedRotues';

export function redirectMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const defaultUrl = request.headers.get('x-redirect-default-helper');
    const alternateLocaleUrl = request.headers.get('x-redirect-helper');
    const locale = request.headers.get('x-locale-helper');

    // remove custom headers from request
    request.headers.delete('x-redirect-default-helper');
    request.headers.delete('x-redirect-helper');
    request.headers.delete('x-locale-helper');

    const { pathname } = request.nextUrl;

    const sbServerClient = createSbServerClient();
    const {
      data: { user },
    } = await sbServerClient.auth.getUser();

    if (protectedRoutes.includes(pathname) && !user) {
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    }

    if (defaultUrl !== null) {
      return NextResponse.rewrite(defaultUrl);
    } else if (alternateLocaleUrl !== null) {
      return NextResponse.redirect(alternateLocaleUrl);
    }

    return middleware(request, event, response);
  };
}

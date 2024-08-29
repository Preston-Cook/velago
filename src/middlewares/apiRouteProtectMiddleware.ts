import { protectedApiRoutes } from '@/config/protectedApiRoutes';
import { createSbServerClient } from '@/lib/sbServerClient';
import { CustomMiddleware } from '@/types/CustomMiddleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function apiRouteProtectMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { href } = request.nextUrl;

    const hrefSegments = href.split('/');

    if (hrefSegments.at(3) === 'api') {
      const sbServerClient = createSbServerClient();
      const {
        data: { user },
      } = await sbServerClient.auth.getUser();

      const apiRoutePath = `/${hrefSegments.slice(4).join('/')}`;

      if (user === null && protectedApiRoutes.includes(apiRoutePath)) {
        return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
      }

      // TODO: add RBAC for specific API routes for various roles

      return middleware(request, event, response);
    }

    return middleware(request, event, response);
  };
}

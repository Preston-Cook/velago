import { auth } from '@/config/auth';
import {
  protectedApiRoutes,
  protectedPageRoutes,
} from '@/config/protectedRoutes';
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = auth((req) => {
  return handleI18nRouting(req);
});

export default function middleware(req: NextRequest) {
  // const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname);
  const { pathname } = req.nextUrl;

  // handling api routes
  if (pathname.startsWith('/api')) {
    if (protectedApiRoutes.includes(pathname)) {
      // @ts-expect-error The second argument is for app router context, but this is not needed
      return authMiddleware(req);
    } else {
      return NextResponse.next();
    }
  }

  // handling page routes
  if (protectedPageRoutes.includes(pathname)) {
    // @ts-expect-error The second argument is for app router context, but this is not needed
    return authMiddleware(req);
  } else {
    return handleI18nRouting(req);
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.woff|.*\\.png|.*\\.jpeg|.*\\.jpg|.*\\.ico).*)',
  ],
};

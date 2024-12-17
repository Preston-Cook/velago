import { auth } from '@/config/auth';
import { defaultLocale, supportedLocales } from '@/config/locales';
import { authPages, defaultRedirect } from '@/config/misc';
import {
  protectedApiRoutes,
  protectedPageRoutes,
} from '@/config/protectedRoutes';
import { getPathname, routing } from '@/i18n/routing';
import { detectLocale } from '@/lib/detectLocale';
import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET as string;
const supportedLocalesArr: string[] = supportedLocales;

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = auth((req) => {
  // This is fine because the two libraries aren't designed to work with each other and have different types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return handleI18nRouting(req as any);
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: AUTH_SECRET });

  // @ts-ignore
  const userRole = token?.token?.role;

  let locale = await detectLocale(req);
  locale = supportedLocalesArr.includes(locale) ? locale : defaultLocale;

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
    // public route

    // if user trying to go to auth page while already authenticated
    if (token) {
      if (req.method === 'GET' && authPages.includes(pathname)) {
        const urlClone = req.nextUrl.clone();
        const href = defaultRedirect[userRole as Role];

        const localizedPath = getPathname({ href, locale });
        urlClone.pathname = localizedPath;

        return NextResponse.redirect(urlClone);
      }
    }

    return handleI18nRouting(req);
  }
}

export const config = {
  matcher:
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.woff|.*\\.png|.*\\.jpeg|.*\\.jpg|.*\\.ico).*)',
};

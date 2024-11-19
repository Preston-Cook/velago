import { chain } from '@/middleware/chain';
import { i18nMiddleware } from '@/middleware/i18nMiddleware';

export default chain([i18nMiddleware]);

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

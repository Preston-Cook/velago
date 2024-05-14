import { chain } from './lib/chain';
import { i18Middleware } from './middleware/i18Middleware';

export default chain([i18Middleware]);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

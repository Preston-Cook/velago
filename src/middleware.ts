import { updateSession } from './middlewares/authMiddleware';
import { chain } from './middlewares/chain';
import { i18Middleware } from './middlewares/i18middleware';
import { redirectMiddleware } from './middlewares/redirectMiddleware';
import { apiRouteProtectMiddleware } from './middlewares/apiRouteProtectMiddleware';

export default chain([
  i18Middleware,
  updateSession,
  apiRouteProtectMiddleware,
  redirectMiddleware,
]);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

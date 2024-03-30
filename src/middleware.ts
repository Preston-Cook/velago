import { chain } from './middlewares/chain';
import { i18Middleware } from './middlewares/internationalization';

export default chain([i18Middleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

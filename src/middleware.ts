import { chain } from './middlewares/chain';
import { internationalization } from './middlewares/internationalization';

export default chain([internationalization]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

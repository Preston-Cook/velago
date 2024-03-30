import { chain } from './middlewares/chain';
import { I18Middleware } from './middlewares/internationalization';

// This function can be marked `async` if using `await` inside
export default chain([I18Middleware]);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

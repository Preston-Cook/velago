import { CustomMiddleware } from './CustomMiddleware';

export type MiddlewareFactory = (
  middleware: CustomMiddleware,
) => CustomMiddleware;

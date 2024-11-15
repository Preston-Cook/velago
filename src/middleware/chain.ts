import { CustomMiddleware } from '@/types/index';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  if (index === functions.length) {
    return async (
      _request: NextRequest,
      _event: NextFetchEvent,
      response: NextResponse,
    ) => response;
  }

  const current = functions[index];
  const next = chain(functions, index + 1);
  return current(next);
}

import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import type { CustomMiddleware } from '@/types/CustomMiddleware';
import type { MiddlewareFactory } from '@/types/MiddlewareFactory';

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (
    _request: NextRequest,
    _event: NextFetchEvent,
    response: NextResponse,
  ) => response;
}

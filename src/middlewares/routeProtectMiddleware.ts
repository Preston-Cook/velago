import type { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { CustomMiddleware } from '@/types/CustomMiddleware';
import { protectedRoutes } from '@/config/protectedRotues';

export function protectRoutesMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    console.log('asdf');
    return middleware(request, event, response);
  };
}

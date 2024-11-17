import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type Locale = 'en' | 'es';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type ThemeColors = 'Zinc' | 'Rose' | 'Blue' | 'Green' | 'Orange';

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

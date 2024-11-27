import { pathnameLocaleMappings } from '@/config/locales';
import { LucideIcon } from 'lucide-react';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type Locale = 'en' | 'es';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type ThemeColors = 'Rose' | 'Blue' | 'Green' | 'Orange';

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

export interface IconLink {
  name: string;
  href: keyof PathnameConfig;
  icon: LucideIcon;
}

export type PathnameConfig = typeof pathnameLocaleMappings;

export interface Suggestion {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
  };
}

export type Translator = (arg: string) => string;

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

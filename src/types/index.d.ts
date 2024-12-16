import { pathnameLocaleMappings } from '@/config/locales';
import { serviceCategories } from '@/config/misc';
import { Prisma } from '@prisma/client';
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
  href: DelocalizedPathname;
  icon: LucideIcon;
}

export type PathnameConfig = typeof pathnameLocaleMappings;

export type DelocalizedPathname = DelocalizedPathname;

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

export type FieldEnumMapping<T, K> = {
  [field in keyof T]?: Record<string, K>;
};

export type ReadonlyKeys<T extends readonly (string | number | symbol)[]> =
  T[number];

export type ServiceCategory = ReadonlyKeys<typeof serviceCategories>;

export type Resource = Prisma.LocationGetPayload<{
  include: {
    serviceAtLocation: {
      include: { service: { include: { requiredDocuments: true } } };
    };
    addresses: true;
    accessability: true;
    phones: true;
    organization: true;
  };
}>;

export type CompleteService = Prisma.ServiceGetPayload<{
  include: { requiredDocuments: true };
}>;

export type Point = {
  latitude: number;
  longitude: number;
};

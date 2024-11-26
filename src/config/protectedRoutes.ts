import { getAllLocalizedPathnames } from '@/lib/getAllLocalizedPathnames';
import { PathnameConfig } from '@/types';

export const protectedApiRoutes: string[] = [];

export const protectedPageRoutes: string[] = [
  '/profile',
  '/account',
  '/dashboard',
  '/settings',
].flatMap((el) => getAllLocalizedPathnames(el as keyof PathnameConfig));

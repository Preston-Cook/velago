'use client';

import { usePathname } from 'next/navigation';

export function useLocale() {
  const path = usePathname();
  const locale = path.split('/')[1];
  return { locale };
}

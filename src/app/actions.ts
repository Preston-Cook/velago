'use server';

import { signOut } from '@/config/auth';
import { getPathname } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';

export async function destroySession() {
  const locale = await getLocale();

  const localizedRedirectUrl = getPathname({ href: '/', locale });

  await signOut({ redirect: true, redirectTo: localizedRedirectUrl });
}

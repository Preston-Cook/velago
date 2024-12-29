'use server';

import { auth, signOut } from '@/config/auth';
import { prisma } from '@/config/prisma';
import { getPathname } from '@/i18n/routing';
import { Locale } from '@/types';
import { getLocale } from 'next-intl/server';

export async function destroySession() {
  const locale = await getLocale();

  const localizedRedirectUrl = getPathname({ href: '/', locale });

  await signOut({ redirect: true, redirectTo: localizedRedirectUrl });
}

interface UpdateLocaleParams {
  locale: Locale;
}

export async function updateLocale({ locale }: UpdateLocaleParams) {
  const session = await auth();

  if (!session) {
    return;
  }

  const { user } = session;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        locale,
      },
    });
  } catch {
    return { message: 'something went wrong' };
  }

  return { message: 'success' };
}

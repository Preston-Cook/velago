'use server';

import { signOut } from '@/config/auth';

export async function destroySession() {
  await signOut({ redirect: true, redirectTo: '/' });
}

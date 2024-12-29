import { SESSION_REFETCH_ATTEMPTS } from '@/config/auth';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export async function getCreatedSession(
  attempts: number = SESSION_REFETCH_ATTEMPTS,
): Promise<Session | null> {
  let session = await getSession();

  while (!session && attempts > 0) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    session = await getSession();
    attempts--;
  }

  return session;
}

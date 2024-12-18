'use client';

import { SignInButton } from '@/components/SignInButton';
import { SignOutButton } from '@/components/SignOutButton';
import { SignUpButton } from '@/components/SignUpButton';
import { useSession } from 'next-auth/react';

export function AuthButtons() {
  const { status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <SignOutButton />
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </>
  );
}

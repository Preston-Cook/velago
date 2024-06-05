'use client';

import { Button } from './ui/button';
import Image from 'next/image';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { getURL } from '@/lib/getUrl';

interface GoogleLoginButtonProps {
  text: string;
}

const url = getURL();

export function GoogleLoginButton({ text }: GoogleLoginButtonProps) {
  const sbBrowserClient = createSbBrowserClient();

  async function handleGoogleLogin() {
    await sbBrowserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${url}/api/auth/callback`,
      },
    });
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      type="button"
      className="flex w-full bg-secondary"
    >
      <div className="mr-2 h-auto w-[25px]">
        <Image
          className="h-auto w-auto"
          src="/images/google-logo.png"
          alt="google-logo"
          height={25}
          width={25}
        />
      </div>
      <div>{text}</div>
    </Button>
  );
}

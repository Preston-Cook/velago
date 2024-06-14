'use client';

import { Button } from './ui/button';
import Image from 'next/image';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { getURL } from '@/lib/getUrl';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface GoogleLoginButtonProps {
  text: string;
}

const url = getURL();

export function GoogleLoginButton({ text }: GoogleLoginButtonProps) {
  const sbBrowserClient = createSbBrowserClient();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleGoogleLogin() {
    setIsLoading(true);

    const { error } = await sbBrowserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${url}/api/auth/callback?next=/map`,
      },
    });

    if (error?.status === 403) {
      setIsLoading(false);

      toast({
        title: 'Invalid Code',
        description: 'Your code is invalid',
        variant: 'destructive',
      });
      return;
    }

    if (error) {
      setIsLoading(false);

      toast({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
        variant: 'destructive',
      });
      return;
    }
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      type="button"
      className="flex w-full bg-secondary"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
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
        </>
      )}
    </Button>
  );
}

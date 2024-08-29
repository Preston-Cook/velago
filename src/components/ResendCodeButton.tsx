'use client';

import { cleanPhone } from '@/lib/cleanPhone';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface ResendCodeButtonProps {
  phone: string;
  text: string;
}

export function ResendCodeButton({ phone }: ResendCodeButtonProps) {
  const sbBrowserClient = createSbBrowserClient();
  const [seconds, setSeconds] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(
    function () {
      if (seconds) {
        const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timerId);
      }
    },
    [seconds],
  );

  async function handleClick() {
    if (seconds === 0) {
      const cleanedPhone = cleanPhone(phone);

      setIsLoading(true);

      console.log(cleanedPhone);

      const { error } = await sbBrowserClient.auth.signInWithOtp({
        phone: cleanedPhone,
      });

      console.log(JSON.stringify(error));

      setIsLoading(false);

      setSeconds(10);

      if (error) {
        toast({
          title: 'Uh oh! Something went wrong',
          description: 'There was a problem with your request',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success!',
        description: 'Your code has been sent!',
        variant: 'default',
      });
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isLoading || seconds > 0}
      className="w-[25%] text-white"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : seconds === 0 ? (
        'Resend'
      ) : (
        `${seconds}`
      )}
    </Button>
  );
}

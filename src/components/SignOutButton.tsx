'use client';

import { signOutUser } from '@/services/users';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function SignOutButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      await signOutUser();
    } catch (err) {
      setIsLoading(false);

      toast({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
        variant: 'destructive',
      });
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <Button className="w-[80px] text-center text-white" onClick={handleClick}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign Out'}
    </Button>
  );
}

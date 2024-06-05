'use client';

import { signOutUser } from '@/services/users';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleClick() {
    try {
      await signOutUser();

      toast({
        title: 'Success!',
        description: 'Successfully logged out',
      });
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
        variant: 'destructive',
      });
    }

    router.refresh();
  }

  return <Button onClick={handleClick}>Sign Out</Button>;
}

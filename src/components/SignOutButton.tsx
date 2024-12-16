'use client';

import { destroySession } from '@/app/actions';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils'; // Import a utility function for class names
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SignInButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignInButtonProps) {
  const t = useTranslations('Header.links');
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    await destroySession();
    setIsLoading(false);
  }

  return (
    <Button onClick={handleClick} className={cn('w-[125px] px-2', className)}>
      {isLoading ? (
        <Spinner size={1} />
      ) : (
        <>
          <LogOut /> {t('signOut.text')}
        </>
      )}
    </Button>
  );
}

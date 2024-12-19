'use client';

import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { getPathname } from '@/i18n/routing';
import { cn } from '@/lib/utils'; // Import a utility function for class names
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface SignInButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignInButtonProps) {
  const t = useTranslations('Header.links');
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const localizedPathname = getPathname({ href: '/', locale });

  async function handleClick() {
    setIsLoading(true);
    await signOut({ redirectTo: localizedPathname });
    // no need to set loading to false, because of page refetch
  }

  return (
    <Button
      onClick={handleClick}
      className={cn('flex w-28 items-center justify-center px-2', className)}
    >
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

import { getPathname, usePathname } from '@/i18n/routing';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Image from 'next/image';
import { useState } from 'react';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('UserSignIn');
  const locale = useLocale();
  const pathname = usePathname();
  const redirectUrl =
    pathname === '/signin/user'
      ? getPathname({ href: '/map', locale })
      : getPathname({ href: '/dashboard', locale });

  async function handleClick() {
    setIsLoading(true);
    try {
      await signIn('google', {
        redirectTo: redirectUrl,
      });
    } catch (err) {
      if (!isRedirectError(err)) {
        setIsLoading(false);
      }
    }
  }

  return (
    <Button type="button" variant={'outline'} onClick={handleClick}>
      {isLoading ? (
        <Spinner size={1} />
      ) : (
        <>
          <Image
            alt="Google Logo"
            src={'/images/google-logo.png'}
            height={30}
            width={30}
          />
          {t('google')}
        </>
      )}
    </Button>
  );
}

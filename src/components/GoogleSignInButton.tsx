import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Image from 'next/image';
import { useState } from 'react';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('UserSignIn');

  async function handleClick() {
    setIsLoading(true);
    try {
      await signIn('google', {
        redirectTo: '/map',
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
        <Spinner size={4} />
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

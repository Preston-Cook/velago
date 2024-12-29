import { defaultRedirect } from '@/config/misc';
import { useRouter } from '@/i18n/routing';
import { getCreatedSession } from '@/lib/getCreatedSession';
import { Role } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import Image from 'next/image';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

interface GoogleSignInButtonProps {
  isLoading: boolean;
  setIsLoading: (value: boolean | ((prevState: boolean) => boolean)) => void;
  disabled: boolean;
}

export function GoogleSignInButton({
  disabled = false,
  isLoading,
  setIsLoading,
}: GoogleSignInButtonProps) {
  const t = useTranslations('UserSignIn');
  const router = useRouter();

  async function handleClick() {
    setIsLoading(true);
    try {
      await signIn('google', {
        redirect: false,
      });

      const session = await getCreatedSession();

      if (!session) {
        throw new Error('Unable to fetch session');
      }

      const {
        user: { locale, role },
      } = session;

      router.replace(defaultRedirect[role as Role], { locale });
    } catch (err) {
      if (!isRedirectError(err)) {
        setIsLoading(false);
      }
    }
  }

  return (
    <Button
      disabled={disabled || isLoading}
      type="button"
      variant={'outline'}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner size={1} />
      ) : (
        <>
          <Image
            loading="eager"
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

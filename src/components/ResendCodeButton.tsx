import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ResendCodeButtonProps {
  phone: string;
  email?: string;
  cooldown?: number;
}

export function ResendCodeButton({
  email,
  phone,
  cooldown = 10,
}: ResendCodeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState<number>(0);
  const t = useTranslations();
  const pathname = usePathname();
  const action = pathname.split('/')[2];

  useEffect(
    function () {
      if (seconds > 0) {
        const timerId = setTimeout(() => {
          setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timerId);
      }
    },
    [seconds],
  );

  async function handleClick() {
    if (!phone || phone.trim() === '') {
      console.error('Phone number is required');
      return;
    }

    if (isLoading || seconds > 0) return;

    setIsLoading(true);

    const options =
      action === 'signin' ? { action, phone } : { action, phone, email };

    try {
      const res = await signIn('otp', { ...options, redirect: false });

      if (res?.code === '200') {
        toast.success(t('UserSignIn.toast.success.title'), {
          description: t('UserSignIn.toast.success.description'),
        });
      } else if (res?.code === '409') {
        toast.error('User already exists', {
          description: 'A user already exists with this email or phone number',
        });
      } else if (res?.code === '404') {
        toast.error('User does not exist', {
          description: 'There is no user with this phone number',
        });
      } else {
        throw new Error('OTP request failed');
      }
    } catch {
      toast.error(t('UserSignIn.toast.error.title'), {
        description: t('UserSignIn.toast.error.description'),
      });
    } finally {
      setIsLoading(false);
      setSeconds(cooldown);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || seconds > 0}
      className="w-20"
    >
      {isLoading ? (
        <Spinner size={1} />
      ) : seconds === 0 ? (
        `${t('UserSignUp.dialog.resend')}`
      ) : (
        `${seconds}`
      )}
    </Button>
  );
}

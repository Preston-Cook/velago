import { requestOtp } from '@/app/[locale]/(auth)/signup/user/actions';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { startTransition, useEffect, useState } from 'react';

interface ResendCodeButtonProps {
  phone: string;
  cooldown?: number; //
}

export function ResendCodeButton({
  phone,
  cooldown = 10,
}: ResendCodeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState<number>(0);
  const t = useTranslations();

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

    startTransition(async () => {
      try {
        const response = await requestOtp({ phone });
        if (response?.message !== 'success') {
          throw new Error('Failed to send OTP.');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
      } finally {
        setIsLoading(false);
        setSeconds(cooldown);
      }
    });
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || seconds > 0}
      className="w-20"
    >
      {isLoading ? (
        <Spinner size={2} />
      ) : seconds === 0 ? (
        `${t('UserSignUp.dialog.resend')}`
      ) : (
        `${seconds}`
      )}
    </Button>
  );
}

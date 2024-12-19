import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface SignUpButtonProps {
  className?: string;
}

export function SignUpButton({ className }: SignUpButtonProps) {
  const t = useTranslations('Header.links');
  const { status } = useSession();

  return (
    <Link className={cn('w-28', className)} href="/signup/user">
      <Button className="flex w-full items-center justify-center">
        {status === 'loading' ? (
          <Spinner size={1} />
        ) : (
          <>
            <User /> {t('signUp.text')}
          </>
        )}
      </Button>
    </Link>
  );
}

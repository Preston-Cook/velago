import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Key } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const t = useTranslations('Header.links');
  const { status } = useSession();

  return (
    <Link className={cn('w-28', className)} href="/signin/user">
      <Button className="w-full" variant={'outline'}>
        {status === 'loading' ? (
          <Spinner size={1} />
        ) : (
          <>
            <Key /> {t('signIn.text')}
          </>
        )}
      </Button>
    </Link>
  );
}

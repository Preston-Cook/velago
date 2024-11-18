import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const t = useTranslations('Header');

  return (
    <Link className={className} href="/signup/user">
      <Button variant={'outline'}>
        <h3>{t('signIn')}</h3>
      </Button>
    </Link>
  );
}

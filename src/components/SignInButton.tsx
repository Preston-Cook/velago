import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function SignInButton() {
  const t = useTranslations('Header');

  return (
    <Link href="/signup/user">
      <Button variant={'outline'}>
        <h3>{t('signIn')}</h3>
      </Button>
    </Link>
  );
}

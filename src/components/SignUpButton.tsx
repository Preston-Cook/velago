import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function SignUpButton() {
  const t = useTranslations('Header.links');

  return (
    <Link href="/signup/user">
      <Button>{t('signUp.text')}</Button>
    </Link>
  );
}

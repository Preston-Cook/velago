import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { Key } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const t = useTranslations('Header.links');

  return (
    <Link className={className} href="/signin/user">
      <Button className="w-full" variant={'outline'}>
        <Key /> {t('signIn.text')}
      </Button>
    </Link>
  );
}

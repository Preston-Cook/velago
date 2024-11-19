import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SignUpButtonProps {
  className?: string;
}

export function SignUpButton({ className }: SignUpButtonProps) {
  const t = useTranslations('Header.links');

  return (
    <Link className={className} href="/signup/user">
      <Button className="w-full">
        <User /> {t('signUp.text')}
      </Button>
    </Link>
  );
}

'use client';

import { Link } from '@/i18n/routing';
import { DelocalizedPathname } from '@/types';
import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';

interface SheetLinkProps {
  className?: string;
  variant?:
    | 'outline'
    | 'link'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'ghost';
  icon: LucideIcon;
  href: DelocalizedPathname;
  name: string;
  i18nRootKey: string;
}

export function IconLink({
  className,
  href,
  name,
  icon: Icon,
  i18nRootKey,
  variant = 'outline',
}: SheetLinkProps) {
  const t = useTranslations(`${i18nRootKey}.links`);

  return (
    <Link href={href} className="w-full">
      <Button variant={variant} className={className}>
        {Icon && <Icon />}
        <div>{t(`${name}.text`)}</div>
      </Button>
    </Link>
  );
}

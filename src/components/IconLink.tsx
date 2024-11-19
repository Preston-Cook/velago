'use client';

import { Link } from '@/i18n/routing';
import { PathnameConfig } from '@/types';
import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';

interface SheetLinkProps {
  className?: string;
  icon: LucideIcon;
  href: keyof PathnameConfig;
  name: string;
  i18nRootKey: string;
}

export function IconLink({
  className,
  href,
  name,
  icon: Icon,
  i18nRootKey,
}: SheetLinkProps) {
  const t = useTranslations(`${i18nRootKey}.links`);

  return (
    <Link href={href}>
      <Button variant="outline" className={className}>
        {Icon && <Icon />}
        <div className="mr-auto">{t(`${name}.text`)}</div>
      </Button>
    </Link>
  );
}

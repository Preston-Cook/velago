'use client';

import { useLocale } from '@/hooks/useLocale';
import { i18n } from '@/i18n.config';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

interface LangLinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
}

export function LocaleLink({
  href,
  children,
  className,
  ...props
}: LangLinkProps) {
  const { locale } = useLocale();

  const isDefaultLang = locale === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${locale}${href}`;
  return (
    <NextLink className={className} href={path} {...props}>
      {children}
    </NextLink>
  );
}

'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { i18n } from '@/i18n.config';
import { useLocale } from '@/hooks/useLanguage';

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

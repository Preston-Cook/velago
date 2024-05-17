import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { i18n } from '@/i18n.config';

interface LangLinkProps extends NextLinkProps {
  children: ReactNode;
  lang: string;
  className?: string;
}

export default function LangLink({
  href,
  lang,
  children,
  className,
  ...props
}: LangLinkProps) {
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;
  return (
    <NextLink className={className} href={path} {...props}>
      {children}
    </NextLink>
  );
}

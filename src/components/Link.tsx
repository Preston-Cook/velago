import NextLink from 'next/link';
import { i18n } from '../../i18.config';

interface CustomLinkProps {
  href: string;
  lang: string;
  children: React.ReactNode;
}

export default function Link({ href, lang, ...props }: CustomLinkProps) {
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;
  return <NextLink href={path} {...props} />;
}

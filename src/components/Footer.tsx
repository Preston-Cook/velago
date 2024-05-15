import { v4 as uuidv4 } from 'uuid';
import type { Locale } from '@/types/Locale';
import { getDictionary } from '@/lib/getDictionary';
import { Button } from './ui/button';
import Link from './Link';

interface FooterProps {
  lang: Locale;
}

export default async function Footer({ lang }: FooterProps) {
  const dic = await getDictionary(lang);

  return <footer />;
}

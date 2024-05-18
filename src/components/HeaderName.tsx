'use client';

import LangLink from './Link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface HeaderNameProps {
  lang: string;
}

export function HeaderName({ lang }: HeaderNameProps) {
  const { theme } = useTheme();

  return (
    <div className="items-center hidden md:flex">
      <LangLink className="flex" lang={lang} href="/">
        <Image
          className="mr-2 dark:invert"
          src="/images/logo-black.png"
          height={25}
          width={25}
          alt="logo"
        />
        <h1 className="text-2xl font-bold text-primary">Velago</h1>
      </LangLink>
    </div>
  );
}

'use client';

import { LocaleLink } from './LocaleLink';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface HeaderNameProps {
  lang: string;
}

export function HeaderName({ lang }: HeaderNameProps) {
  return (
    <div className="items-center hidden md:flex">
      <LocaleLink className="flex" href="/">
        <Image
          className="mr-2 dark:invert h-[25px] w-[25px]"
          src="/images/logo-black.png"
          height={25}
          width={25}
          alt="logo"
        />
        <h1 className="text-2xl font-bold text-primary">Velago</h1>
      </LocaleLink>
    </div>
  );
}

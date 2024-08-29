'use client';

import Image from 'next/image';
import { LocaleLink } from './LocaleLink';

interface HeaderNameProps {
  lang: string;
}

export function HeaderName({ lang }: HeaderNameProps) {
  return (
    <div className="hidden items-center md:flex">
      <LocaleLink className="flex" href="/">
        <Image
          className="mr-2 h-[25px] w-[25px] dark:invert"
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

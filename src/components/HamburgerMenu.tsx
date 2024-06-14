'use client';

import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { DarkModeToggle } from './DarkModeToggle';
import Image from 'next/image';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';

export interface LinkProps {
  href: string;
  text: string;
}

export interface HamburgerMenuProps {
  links: LinkProps[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <div className="h-10 rounded-lg bg-primary px-4 py-2 text-primary-foreground text-white hover:bg-primary/90">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-[6000] w-[300px] bg-secondary sm:w-[400px]"
      >
        <h2 className="flex px-2 py-4 text-2xl font-bold text-primary">
          <Image
            className="mr-2 h-auto w-auto dark:invert"
            src="/images/logo-black.png"
            height={25}
            width={25}
            alt="logo"
          />
          Velago
        </h2>
        <nav className="flex flex-col gap-4">
          {links.map((route) => (
            <Link
              key={uuidv4()}
              href={route.href}
              className="block px-2 py-1 text-lg"
            >
              {route.text}
            </Link>
          ))}
        </nav>
        <Separator className="my-4 h-[1px] bg-primary" />
        <DarkModeToggle />
      </SheetContent>
    </Sheet>
  );
}

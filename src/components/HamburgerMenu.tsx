'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { DarkModeToggle } from './DarkModeToggle';

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
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-secondary">
        <h2 className="px-2 py-4 text-2xl text-primary font-bold">Velago</h2>
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
        <DarkModeToggle />
      </SheetContent>
    </Sheet>
  );
}

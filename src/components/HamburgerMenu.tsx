'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { DarkModeToggle } from './DarkModeToggle';

export interface LinkType {
  href: string;
  text: string;
}

export interface HamburgerMenuProps {
  links: LinkType[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-secondary">
        <DarkModeToggle />
      </SheetContent>
    </Sheet>
  );
}

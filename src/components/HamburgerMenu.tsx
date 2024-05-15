'use client';

import { Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import CustomLink from './CustomLink';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';

export interface CustomLinkType {
  href: string;
  text: string;
}

export interface HamburgerMenuProps {
  CustomLinks: CustomLinkType[];
}

export default function HamburgerMenu({ CustomLinks }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <CustomLink href="/">
          <span className="sr-only">ShadCN</span>
        </CustomLink>
        <div className="grid gap-2 py-6">
          <CustomLink
            className="flex w-full items-center py-2 text-lg font-semibold"
            href="/"
          >
            Home
          </CustomLink>
          <CustomLink
            className="flex w-full items-center py-2 text-lg font-semibold"
            href="/"
          >
            About
          </CustomLink>
          <CustomLink
            className="flex w-full items-center py-2 text-lg font-semibold"
            href="/"
          >
            Services
          </CustomLink>
          <CustomLink
            className="flex w-full items-center py-2 text-lg font-semibold"
            href="/"
          >
            Portfolio
          </CustomLink>
          <CustomLink
            className="flex w-full items-center py-2 text-lg font-semibold"
            href="/"
          >
            Contact
          </CustomLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

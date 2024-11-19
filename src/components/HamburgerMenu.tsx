'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SheetSidebar } from './SheetSidebar';

interface HamburgerMenuProps {
  className?: string;
}

export function HamburgerMenu({ className }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className={className}>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col p-4 bg-secondary w-[60%]"
        side={'right'}
      >
        <SheetSidebar />
      </SheetContent>
    </Sheet>
  );
}

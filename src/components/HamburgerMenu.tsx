'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
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
        className="flex w-[60%] flex-col bg-secondary p-4"
        side={'right'}
      >
        <SheetSidebar />
      </SheetContent>
    </Sheet>
  );
}

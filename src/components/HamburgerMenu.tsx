import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface HamburgerMenuProps {
  className?: string;
}

export function HamburgerMenu({ className }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={'outline'} className={className}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>asdf</SheetContent>
    </Sheet>
  );
}

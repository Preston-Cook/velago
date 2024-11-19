'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sheetSectionNames } from '@/config/misc';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { SheetSection } from './SheetSection';

interface HamburgerMenuProps {
  className?: string;
}

export function HamburgerMenu({ className }: HamburgerMenuProps) {
  const t = useTranslations('Footer');

  return (
    <Sheet>
      <SheetTrigger className={className}>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col p-4 bg-secondary w-[60%]"
        side={'right'}
      >
        <SheetHeader className=" p-1 ">
          <div className="flex flex-1">
            <Link
              href={'/'}
              className="flex justify-start items-center gap-x-2"
            >
              <Image
                className="dark:hidden"
                src="/images/logo-black.png"
                height={30}
                width={30}
                alt="Velago logo"
              />
              <Image
                className="hidden dark:block"
                src="/images/logo-white.png"
                height={30}
                width={30}
                alt="Velago logo"
              />
              <SheetTitle className="text-2xl text-primary">Velago</SheetTitle>
            </Link>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-scroll">
          <div className="flex-1 flex-col flex gap-4 border-primary border-t py-4">
            {sheetSectionNames.map(({ name, links }) => (
              <SheetSection key={uuid()} name={name} links={links} />
            ))}
          </div>

          <SheetFooter>
            <div className="text-center mr-auto">
              {`© ${new Date().getFullYear()} Velago™ ${t('legal')}`}
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

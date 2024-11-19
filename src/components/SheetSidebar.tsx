import { sheetSectionNames } from '@/config/misc';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { AccountSheetSection } from './AccountSheetSection';
import { MiscSheetSection } from './MiscSheetSection';
import { SheetSection } from './SheetSection';
import { SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';

export function SheetSidebar() {
  const t = useTranslations('Footer');

  return (
    <>
      <SheetHeader className="p-1 ">
        <div className="flex flex-1">
          <Link href={'/'} className="flex justify-start items-center gap-x-2">
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
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <div className="flex-1 flex-col flex gap-4 border-primary border-t py-4">
          {sheetSectionNames.map(({ name, links }) => (
            <SheetSection key={uuid()} name={name} links={links} />
          ))}
          <AccountSheetSection />
          <MiscSheetSection />
        </div>

        <SheetFooter>
          <div className="text-center mr-auto">
            {`© ${new Date().getFullYear()} Velago™ ${t('legal')}`}
          </div>
        </SheetFooter>
      </div>
    </>
  );
}
'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { supportedLocales } from '@/config/supportedLocales';
import { usePathname, useRouter } from '@/i18n/routing';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { v4 as uuid } from 'uuid';

export function LocaleToggle() {
  const t = useTranslations('Header.localeToggle');
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const params = useParams();

  function handleLocaleChange(e: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: e },
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <h3 className=" w-[70px]">{t('label')}</h3>
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="bg-background p-0">
        <div className="border-none">
          <DropdownMenuRadioGroup
            onValueChange={handleLocaleChange}
            value={currentLocale}
          >
            {supportedLocales.map((locale) => (
              <DropdownMenuRadioItem
                className={`border-none outline-none ${currentLocale === locale ? 'bg-primary text-white' : 'hover:bg-secondary'} p-2 hover:cursor-pointer flex justify-between items-center`}
                value={locale}
                key={uuid()}
                disabled={isPending}
              >
                {t(locale)}
                <Image
                  src={`/images/${locale}.png`}
                  height={10}
                  width={40}
                  alt={`${t(`${locale}`)} flag`}
                />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import { updateLocale } from '@/app/actions';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { supportedLocales } from '@/config/locales';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Locale } from '@/types';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { Languages } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { v4 as uuid } from 'uuid';
import { Spinner } from './Spinner';

interface LocaleToggleProps {
  className?: string;
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const t = useTranslations('Header.localeToggle');
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const params = useParams();
  const { status } = useSession();

  async function handleLocaleChange(e: string) {
    if (status === 'authenticated') {
      await updateLocale({ locale: e as Locale });
    }

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known params
        // are used in combination with a given pathname. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: e },
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          className={cn('p-3', className)}
          variant={'outline'}
        >
          {isPending ? <Spinner size={1} /> : <Languages />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border border-primary bg-secondary p-0"
      >
        <div className="border-none">
          <DropdownMenuRadioGroup
            onValueChange={handleLocaleChange}
            value={currentLocale}
          >
            {supportedLocales.map((locale) => (
              <DropdownMenuRadioItem
                className={`border-none outline-none hover:bg-primary hover:text-white ${currentLocale === locale && 'bg-primary text-white'} flex items-center justify-between p-2 hover:cursor-pointer`}
                value={locale}
                key={uuid()}
                disabled={isPending}
              >
                {t(locale)}
                <Image
                  loading="eager"
                  src={`/images/${locale}.png`}
                  height={25}
                  width={25}
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

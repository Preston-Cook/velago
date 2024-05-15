'use client';

import redirectedPathName from '@/lib/redirectedPathname';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Locale } from '@/types/Locale';

export default function LanguageDropdown() {
  const pathName = usePathname();
  const router = useRouter();
  const { lang } = useParams<{ lang: Locale }>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[80px]" asChild>
        <Button
          className="hover:bg-primary hover:text-white py-5 px-4"
          variant="outline"
        >
          {lang === 'en' ? 'English' : 'Español'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuLabel>
          {lang === 'en' ? 'Language' : 'Idioma'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(e) => {
            const newPath = redirectedPathName(e, pathName);
            router.push(newPath);
          }}
        >
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

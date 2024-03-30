'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageDropDown() {
  const pathName = usePathname();
  const router = useRouter();
  const locale = pathName.split('/')[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[80px]" asChild>
        <Button variant="outline">
          {locale === 'en' ? 'English' : 'Español'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuLabel> Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(e) => {
            const pathPieces = pathName.split('/');
            pathPieces[1] = e;
            const newPath = pathPieces.join('/');
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

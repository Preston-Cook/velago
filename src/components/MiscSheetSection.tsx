import { useTranslations } from 'next-intl';
import { ThemeColorToggle } from './ThemeColorToggle';
import { ThemeModeToggle } from './ThemeModeToggle';
import { SheetDescription } from './ui/Sheet';

export function MiscSheetSection() {
  const t = useTranslations('Sheet.sections.account');

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">{'Miscellaneous'}</SheetDescription>
      <div className="flex flex-col md:flex-row gap-4">
        <ThemeModeToggle className="w-full" />
        <ThemeColorToggle />
      </div>
    </div>
  );
}

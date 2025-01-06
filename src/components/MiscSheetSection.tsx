import { useTranslations } from 'next-intl';
import { ThemeColorToggle } from './ThemeColorToggle';
import { ThemeModeToggle } from './ThemeModeToggle';
import { SheetDescription } from './ui/Sheet';

export function MiscSheetSection() {
  const t = useTranslations('Components.Sheet.sections.miscellaneous');

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">{t('title')}</SheetDescription>
      <div className="flex flex-col gap-4 md:flex-row">
        <ThemeModeToggle className="w-full" />
        <ThemeColorToggle />
      </div>
    </div>
  );
}

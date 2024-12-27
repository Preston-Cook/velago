import { ThemeColorToggle } from './ThemeColorToggle';
import { ThemeModeToggle } from './ThemeModeToggle';
import { SheetDescription } from './ui/Sheet';

export function MiscSheetSection() {
  // const t = useTranslations('Sheet.sections.account');

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">{'Miscellaneous'}</SheetDescription>
      <div className="flex flex-col gap-4 md:flex-row">
        <ThemeModeToggle className="w-full" />
        <ThemeColorToggle />
      </div>
    </div>
  );
}

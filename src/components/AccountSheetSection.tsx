import { useTranslations } from 'next-intl';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';
import { SheetDescription } from './ui/Sheet';

export function AccountSheetSection() {
  const t = useTranslations('Components.Sheet.sections.account');

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">{t('title')}</SheetDescription>
      <div className="flex flex-col gap-4 md:flex-row">
        <SignInButton className="w-full" />
        <SignUpButton className="w-full" />
      </div>
    </div>
  );
}

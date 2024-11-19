import { useTranslations } from 'next-intl';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';
import { SheetDescription } from './ui/sheet';

export function AccountSheetSection() {
  const t = useTranslations('Sheet.sections.account');

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">{t('title')}</SheetDescription>
      <div className="flex flex-col md:flex-row gap-4">
        <SignInButton className="w-full" />
        <SignUpButton className="w-full" />
      </div>
    </div>
  );
}
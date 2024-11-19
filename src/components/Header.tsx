import { SignInButton } from '@/components/SignInButton';
import { SignUpButton } from '@/components/SignUpButton';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HamburgerMenu } from './HamburgerMenu';
import { HeaderLinks } from './HeaderLinks';
import { LocaleToggle } from './LocaleToggle';
import { ThemeModeToggle } from './ThemeModeToggle';

export async function Header() {
  return (
    <header className="bg-secondary border-b border-primary p-4 flex">
      <div className="flex flex-1 gap-8">
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
          <h3 className="text-2xl text-primary">Velago</h3>
        </Link>
        <div className="hidden lg:flex gap-x-4">
          <HeaderLinks />
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <LocaleToggle />
        <ThemeModeToggle className="hidden md:flex" />
        <SignInButton className="hidden md:flex" />
        <SignUpButton />
        <HamburgerMenu className="lg:hidden" />
      </div>
    </header>
  );
}

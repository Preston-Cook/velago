import { HamburgerMenu } from '@/components/HamburgerMenu';
import { LocaleToggle } from '@/components/LocaleToggle';
import { SignInButton } from '@/components/SignInButton';
import { SignUpButton } from '@/components/SignUpButton';
import { ThemeModeToggle } from '@/components/ThemeModeToggle';
import Image from 'next/image';

export default async function Header() {
  return (
    <header className="bg-secondary border-b border-primary p-4 flex">
      <div className="flex justify-start items-center gap-x-2 flex-1">
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
      </div>
      <div className="flex gap-x-4 items-center">
        <LocaleToggle />
        <ThemeModeToggle className="hidden md:flex" />
        <SignInButton className="hidden md:flex" />
        <SignUpButton />
        <HamburgerMenu className="md:hidden" />
      </div>
    </header>
  );
}

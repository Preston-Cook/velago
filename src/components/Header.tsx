import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';
import HamburgerMenu from './HamburgerMenu';
import { Button } from './ui/Button';
import LanguageDropDown from './LanguageDropDown';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  lang: Locale;
}

async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang);

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b ">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-bold text-primary">Velago</h1>
          </Link>
        </div>
        <nav className="space-x-6 hidden max-w-400px justify-end md:flex ml-auto">
          {dic.header.links.map((link) => (
            <Button
              key={`${uuidv4()}`}
              asChild
              variant="ghost"
              className="sm:px-2 lg:px-4"
            >
              <Link
                key={`${uuidv4()}`}
                href={link.href}
                className="text-sm font-medium transition-colors"
              >
                {link.text}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center justify-end">
          <DarkModeToggle />
          <LanguageDropDown />
          <Button
            className="mx-4 md:ml-6 w-fit py-2 px-4"
            variant="default"
            size="icon"
            aria-label="Toggle Theme"
          >
            Sign Up
          </Button>
          <HamburgerMenu links={dic.header.links} />
        </div>
      </div>
    </header>
  );
}

export default Header;

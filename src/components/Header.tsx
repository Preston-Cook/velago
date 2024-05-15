import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import type { Locale } from '@/types/Locale';
import { getDictionary } from '@/lib/getDictionary';
import HamburgerMenu from './HamburgerMenu';
import { Button } from './ui/button';
import LanguageDropdown from './LanguadeDropdown';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  lang: Locale;
}

async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang);

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b bg-secondary">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Velago</h1>
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
          <div className="hidden md:inline-flex mx-6">
            <DarkModeToggle />
          </div>
          <LanguageDropdown />
          <Button
            className="md:ml-6 w-fit py-2 px-4 mx-2"
            variant="default"
            size="icon"
            aria-label="Toggle Theme"
          >
            {dic.header.signUp}
          </Button>
          <HamburgerMenu links={dic.header.links} />
        </div>
      </div>
    </header>
  );
}

export default Header;

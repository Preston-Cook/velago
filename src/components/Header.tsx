import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';
import HamburgerMenu from './HamburgerMenu';
import { Button } from './ui/button';
import LanguageDropDown from './LanguageDropDown';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  lang: Locale;
}

async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang);

  return (
    <header className="sm:flex sm:justify-between py-3 border-b bg-secondary">
      <div className="relative px-4 lg:px-8 flex h-16 items-center justify-between w-full">
        <HamburgerMenu links={dic.header.links} />
        <div className="items-center hidden md:flex">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Velago</h1>
          </Link>
        </div>
        <nav className="gap-2 ml-4 hidden max-w-400px md:flex mr-auto">
          {dic.header.links.map((link) => (
            <Button
              key={`${uuidv4()}`}
              variant="outline"
              className="sm:px-2 lg:px-4"
            >
              <Link
                key={`${uuidv4()}`}
                href={link.href}
                className="text-sm font-medium"
              >
                {link.text}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:inline-flex">
            <DarkModeToggle />
          </div>
          <LanguageDropDown />
          <Button className="w-fit py-2 px-4 " variant="outline" size="icon">
            {dic.header.signIn}
          </Button>
          <Button
            className="w-fit py-2 px-4 text-white"
            variant="default"
            size="icon"
          >
            <Link href="/">{dic.header.signUp}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;

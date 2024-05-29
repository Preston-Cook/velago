import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';
import HamburgerMenu from './HamburgerMenu';
import { Button } from './ui/button';
import LanguageDropDown from './LanguageDropDown';
import { DarkModeToggle } from './DarkModeToggle';
import { LocaleLink } from './LocaleLink';
import { HeaderName } from './HeaderName';

interface HeaderProps {
  lang: Locale;
}

async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang);

  return (
    <header className="sm:flex sm:justify-between py-3 border-b bg-secondary border-primary">
      <div className="relative px-4 lg:px-8 flex h-16 items-center justify-between w-full">
        <HamburgerMenu links={dic.header.links} />
        <HeaderName lang={lang} />
        <nav className="gap-2 ml-6 hidden max-w-400px md:flex mr-auto">
          {dic.header.links.map((link) => (
            <Button
              key={`${uuidv4()}`}
              variant="outline"
              className="sm:px-2 lg:px-4"
            >
              <LocaleLink
                key={`${uuidv4()}`}
                href={link.href}
                className="text-sm font-medium"
              >
                {link.text}
              </LocaleLink>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:inline-flex">
            <DarkModeToggle />
          </div>
          <LanguageDropDown />
          <LocaleLink href="/signin/user">
            <Button className="w-fit py-2 px-4 " variant="outline" size="icon">
              {dic.header.signIn}
            </Button>
          </LocaleLink>
          <Button
            className="w-fit py-2 px-4 text-white"
            variant="default"
            size="icon"
          >
            <LocaleLink href="/signup/user">{dic.header.signUp}</LocaleLink>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;

import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { v4 as uuidv4 } from 'uuid';
import { DarkModeToggle } from './DarkModeToggle';
import HamburgerMenu from './HamburgerMenu';
import { HeaderName } from './HeaderName';
import LanguageDropDown from './LanguageDropDown';
import { LocaleLink } from './LocaleLink';
import ProfileButton from './ProfileButton';
import { Button } from './ui/button';

interface HeaderProps {
  lang: Locale;
}

async function Header({ lang }: HeaderProps) {
  const dic = await getDictionary(lang);
  const currentUser = await getCurrentUser();

  return (
    <header className="relative z-50 border-b border-primary bg-secondary py-3 sm:flex sm:justify-between">
      <div className="relative flex h-16 w-full items-center justify-between px-4 lg:px-8">
        <HamburgerMenu links={dic.header.links} />
        <HeaderName lang={lang} />
        <nav className="max-w-400px ml-6 mr-auto hidden gap-2 md:flex">
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

          {!currentUser ? (
            <>
              <LocaleLink href="/signin/user">
                <Button
                  className="w-fit px-4 py-2"
                  variant="outline"
                  size="icon"
                >
                  {dic.header.signIn}
                </Button>
              </LocaleLink>
              <LocaleLink href="/signup/user">
                <Button
                  className="w-fit px-4 py-2 text-white"
                  variant="default"
                  size="icon"
                >
                  {dic.header.signUp}
                </Button>
              </LocaleLink>
            </>
          ) : (
            <>
              <ProfileButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

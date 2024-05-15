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

  return <header />;
}

export default Header;

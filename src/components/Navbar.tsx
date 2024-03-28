'use client';

import Link from 'next/link';
import Container from './ui/Container';
import { Button } from './ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import LanguageDropDown from './LanguageDropDown';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: '/',
      label: 'About',
    },
    {
      href: '/',
      label: 'Contact',
    },
    {
      href: '/',
      label: 'FAQ',
    },
  ];

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b ">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-bold text-primary">Velago</h1>
          </Link>
        </div>
        <nav className="space-x-6 hidden max-w-400px justify-end md:flex ml-auto">
          {routes.map((route, i) => (
            <Button key={i} asChild variant="ghost" className="sm:px-2 lg:px-4">
              <Link
                key={i}
                href={route.href}
                className="text-sm font-medium transition-colors"
              >
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mx-6 hidden md:inline-flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <LanguageDropDown />
          <Button
            className="mx-4 md:mx-6 w-fit py-2 px-4"
            variant="default"
            size="icon"
            aria-label="Toggle Theme"
          >
            Sign Up
          </Button>
          <Sheet>
            <SheetTrigger>
              <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

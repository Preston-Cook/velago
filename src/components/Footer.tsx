import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/button';
import { LocaleLink } from './LocaleLink';
import Image from 'next/image';

interface FooterProps {
  lang: Locale;
}

export default async function Footer({ lang }: FooterProps) {
  const dic = await getDictionary(lang);

  return (
    <footer className="border-t border-primary sm:flex sm:justify-between py-8 px-4 bg-secondary">
      <div className="mx-auto max-w-screen-xl text-center">
        <LocaleLink href="/">
          <Button
            className="sm:pl-0 text-2xl font-semibold flex mx-auto"
            variant="link"
          >
            <Image
              className="mr-2 dark:invert"
              src="/images/logo-black.png"
              height={25}
              width={25}
              alt="logo"
            />
            Velago
          </Button>
        </LocaleLink>
        <p className="my-6 ">{dic.footer.description}</p>
        <ul className="flex flex-wrap justify-center items-center mb-6 ">
          {dic.footer.links.map((link) => (
            <li key={uuidv4()}>
              <LocaleLink href={`/${link.toLowerCase()}`}>
                <Button className="sm:pl-0" variant="link">
                  {link}
                </Button>
              </LocaleLink>
            </li>
          ))}
        </ul>
        <span className="text-sm sm:text-center ">
          © 2024 Velago™ {dic.footer.legal}
        </span>
      </div>
    </footer>
  );
}

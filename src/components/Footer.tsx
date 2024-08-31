import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { LocaleLink } from './LocaleLink';
import { Button } from './ui/button';

interface FooterProps {
  lang: Locale;
}

export default async function Footer({ lang }: FooterProps) {
  const dic = await getDictionary(lang);

  return (
    <footer className="border-t border-primary bg-secondary px-4 py-8 sm:flex sm:justify-between">
      <div className="mx-auto max-w-screen-xl text-center">
        <LocaleLink href="/">
          <Button
            className="mx-auto flex text-2xl font-semibold sm:pl-0"
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
        <p className="my-6">{dic.footer.description}</p>
        <ul className="mb-6 flex flex-wrap items-center justify-center">
          {dic.footer.links.map((link, i) => {
            const { href, text } = link;
            return (
              <li key={uuidv4()}>
                <LocaleLink href={href}>
                  <Button className="sm:pl-0" variant="link">
                    {text}
                  </Button>
                </LocaleLink>
              </li>
            );
          })}
        </ul>
        <span className="text-sm sm:text-center">
          © 2024 Velago™ {dic.footer.legal}
        </span>
      </div>
    </footer>
  );
}

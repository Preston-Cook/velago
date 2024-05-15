import { v4 as uuidv4 } from 'uuid';
import type { Locale } from '@/types/Locale';
import { getDictionary } from '@/lib/getDictionary';
import { Button } from './ui/button';
import Link from './Link';

interface FooterProps {
  lang: Locale;
}

export default async function Footer({ lang }: FooterProps) {
  const dic = await getDictionary(lang);

  return (
    <footer className="border-t sm:flex sm:justify-between py-8 px-4 border-b bg-secondary mt-6">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link lang={lang} href="/">
          <Button className="sm:pl-0 text-2xl font-semibold" variant="link">
            Velago
          </Button>
        </Link>
        <p className="my-6 ">{dic.footer.description}</p>
        <ul className="flex flex-wrap justify-center items-center mb-6 ">
          {dic.footer.links.map((link) => (
            <li key={uuidv4()}>
              <Link lang={lang} href={`/${link.toLowerCase()}`}>
                <Button className="sm:pl-0" variant="link">
                  {link}
                </Button>
              </Link>
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

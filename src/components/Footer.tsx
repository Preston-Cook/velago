import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/Button';
import Link from './Link';

interface FooterProps {
  lang: Locale;
}

export default async function Footer({ lang }: FooterProps) {
  const dic = await getDictionary(lang);

  return (
    <footer className="border-t sm:flex sm:justify-between py-3 px-4 border-b bg-secondary">
      <div className="px-4 sm:px-6 lg:px-8">
        <span className="text-sm  sm:text-center ">
          © 2024 Velago {dic.footer.legal}
        </span>
        <ul className="flex flex-wrap justify-center sm:justify-start items-center mt-3 text-sm font-medium">
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
      </div>
    </footer>
  );
}

import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import PartnerCard from './PartnerCard';
import { Button } from './ui/button';

interface ContentProps {
  lang: Locale;
}

export default async function Content({ lang }: ContentProps) {
  const dic = (await getDictionary(lang)).pages.home.content;

  return (
    <>
      <section className="mx-auto w-full py-6">
        <h2 className="mb-2 text-center text-3xl font-bold text-primary lg:mb-8 lg:text-4xl">
          {dic.title}
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-10 px-4 md:flex-row md:gap-24">
          {dic.cards.map((card) => (
            <PartnerCard
              key={uuidv4()}
              title={card.title}
              description={card.description}
              action={card.title}
            />
          ))}
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-8 lg:py-6">
          <div className="sm:text-lg">
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-primary">
              {dic.productDescription.title}
            </h2>
            <p className="my-8">{dic.productDescription.paragraph1}</p>
            <p className="mb-4">{dic.productDescription.paragraph2}</p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center font-medium"
            >
              <Button className="pl-0" variant="link">
                {dic.productDescription.link}
                <svg
                  className="ml-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

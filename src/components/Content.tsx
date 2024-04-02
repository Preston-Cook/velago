import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
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
        <h2 className="mb-2 lg:mb-8 text-3xl lg:text-4xl font-bold text-center text-primary">
          {dic.title}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-10 md:gap-24 px-4">
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
        <div className="px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
          <div className="sm:text-lg">
            <h2 className="mb-4 text-4xl text-center text-primary tracking-tight font-bold ">
              {dic.productDescription.title}
            </h2>
            <p className="my-8">{dic.productDescription.paragraph1}</p>
            <p className="mb-4 font-semibold">
              {dic.productDescription.paragraph2}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center font-medium mt-4"
            >
              <Button className="pl-0" variant="link">
                {dic.productDescription.link}
                <svg
                  className="ml-1 w-6 h-6"
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

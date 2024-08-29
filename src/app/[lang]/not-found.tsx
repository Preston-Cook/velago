'use client';

import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n.config';
import { useParams } from 'next/navigation';

const errorText = {
  en: {
    title: "Something's Missing",
    text: "Sorry, we can't find that page. You'll find lots to explore on the home page.",
    link: 'Back to Homepage',
  },
  es: {
    title: 'Algo falta.',
    text: 'Lo sentimos, no podemos encontrar esa página. Encontrarás mucho para explorar en la página de inicio.',
    link: 'Volver a la página de inicio.',
  },
};

export default function Error() {
  const { lang } = useParams<{ lang: Locale }>();
  const dic = errorText[lang as keyof typeof errorText];

  return (
    <div className="flex h-[90.5vh] flex-col items-center justify-center px-2">
      <div className="mx-auto rounded-md border bg-secondary px-10">
        <div className="z-0 mx-auto py-4 text-center">
          <h1 className="mb-4 text-7xl font-bold tracking-tight text-primary lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {dic.title}
          </p>
          <p className="mx-auto my-14 mb-4 w-[80%] text-lg font-light">
            {dic.text}
          </p>
          <LocaleLink
            href="/"
            className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            <Button variant="link">{dic.link}</Button>
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}

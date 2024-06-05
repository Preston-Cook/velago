'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n.config';

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

export default function NotFound() {
  const { lang } = useParams<{ lang: Locale }>();
  const dic = errorText[lang as keyof typeof errorText];

  return (
    <section className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] px-4">
      <div className="mx-auto w-fit rounded-md border bg-secondary px-8">
        <div className="mx-auto py-4 text-center">
          <h1 className="mb-4 text-7xl font-bold tracking-tight text-primary lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {dic.title}
          </p>
          <p className="mx-auto my-14 mb-4 w-[80%] text-lg font-light">
            {dic.text}
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            <Button variant="link">{dic.link}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

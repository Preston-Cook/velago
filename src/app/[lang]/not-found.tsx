'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
  const dic = errorText[lang];

  return (
    <section className="px-4 absolute translate-x-[-50%] top-[50%] left-[50%] translate-y-[-50%]">
      <div className="px-8 mx-auto w-fit bg-secondary border rounded-md">
        <div className="mx-auto text-center py-4">
          <h1 className="mb-4 text-7xl tracking-tight font-bold lg:text-9xl text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-primary">
            {dic.title}
          </p>
          <p className="mb-4 text-lg font-light my-14 w-[80%] mx-auto">
            {dic.text}
          </p>
          <Link
            href="/"
            className="inline-flex font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            <Button variant="link">{dic.link}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

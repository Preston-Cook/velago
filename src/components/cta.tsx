import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { HomeSearchBar } from './HomeSearchBar';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface CallToActionProps {
  lang: Locale;
}

export default async function Cta({ lang }: CallToActionProps) {
  const dic = (await getDictionary(lang)).pages.home.callToAction;
  const searchPlaceholders = dic.placeholders;
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
  const placeholder = searchPlaceholders[randomIndex];

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 text-center lg:px-12 lg:pb-10 lg:pt-16">
        <h1 className="mb-12 text-4xl font-bold leading-none tracking-tight text-primary md:text-5xl lg:text-5xl">
          {dic.title}
        </h1>
        <p className="mb-12 text-lg font-normal sm:px-16 lg:text-xl xl:px-48">
          {dic.description}
        </p>
        <HomeSearchBar lang={lang} placeholder={placeholder} />
      </div>
    </section>
  );
}

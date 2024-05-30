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
      <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12 lg:pb-10">
        <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
          {dic.title}
        </h1>
        <p className="mb-12 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 ">
          {dic.description}
        </p>
        <HomeSearchBar lang={lang} placeholder={placeholder} />
      </div>
    </section>
  );
}

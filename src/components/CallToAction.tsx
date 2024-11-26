import { useTranslations } from 'next-intl';
import { HomeSearchBar } from './HomeSearchBar';

export function CallToAction() {
  const t = useTranslations('Home.cta');

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
        {t('heading')}
      </h1>
      <h3 className="text-center text-lg">{t('subheading')}</h3>
      <div className="w-full">
        <HomeSearchBar />
      </div>
    </div>
  );
}

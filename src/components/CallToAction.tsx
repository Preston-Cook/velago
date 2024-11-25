import { useTranslations } from 'next-intl';
import { HomeSearchBar } from './HomeSearchBar';

export function CallToAction() {
  const t = useTranslations('Home.cta');

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h1 className="text-primary text-4xl md:text-5xl text-center w-full">
        {t('heading')}
      </h1>
      <h3 className="text-center text-lg">{t('subheading')}</h3>
      <div className="w-full">
        <HomeSearchBar />
      </div>
    </div>
  );
}

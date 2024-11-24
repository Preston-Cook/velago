'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IconLink } from './IconLink';

export function Info() {
  const t = useTranslations('Home.info');

  return (
    <div className="flex flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary mx-auto">
        {t('title')}
      </h2>
      <p>{t('p1')}</p>
      <p>{t('p2')}</p>
      <IconLink
        variant="default"
        href="/about"
        i18nRootKey="Home.info"
        name="about"
        icon={ArrowLeft}
      />
    </div>
  );
}

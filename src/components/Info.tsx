'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IconLink } from './IconLink';

export function Info() {
  const t = useTranslations('Home.info');

  return (
    <div className="mx-auto flex flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
      <h2 className="mx-auto text-3xl text-primary md:text-4xl">
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

'use client';

import { BriefcaseMedical, HandHelping } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PartnerCard } from './PartnerCard';

export function Partner() {
  const t = useTranslations('Home.partner');

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mx-auto text-3xl text-primary md:text-4xl">
        {t('title')}
      </h2>
      <div className="mx-auto flex flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] md:flex-row lg:max-w-[60%] lg:gap-16">
        <PartnerCard
          icon={BriefcaseMedical}
          title={t('medicalServices.title')}
          description={t('medicalServices.description')}
          name="medicalServices"
        />
        <PartnerCard
          name="charitableServices"
          icon={HandHelping}
          title={t('charitableServices.title')}
          description={t('charitableServices.description')}
        />
      </div>
    </div>
  );
}

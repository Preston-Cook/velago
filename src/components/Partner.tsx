'use client';

import { BriefcaseMedical, HandHelping } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PartnerCard } from './PartnerCard';

export function Partner() {
  const t = useTranslations('Home.partner');

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl md:text-4xl text-primary mx-auto">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-8 lg:gap-16 sm:max-w-[90%] md:flex-row md:max-w-[80%] lg:max-w-[60%] mx-auto">
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

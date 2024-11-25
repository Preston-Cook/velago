import { AboutSection } from '@/components/AboutSection';
import { Separator } from '@/components/ui/Separator';
import { aboutSectionIcons } from '@/config/misc';
import { getTranslations } from 'next-intl/server';
import { v4 as uuid } from 'uuid';

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="flex flex-col py-8 gap-12">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-primary text-4xl md:text-5xl text-center w-full">
          {t('title')}
        </h1>
        <h3 className="text-lg text-center sm:max-w-[90%] md:flex-row md:max-w-[80%] lg:max-w-[60%] mx-auto">
          {t('subheading')}
        </h3>
      </div>
      <Separator className="bg-primary sm:max-w-[90%] md:flex-row md:max-w-[80%] lg:max-w-[60%] mx-auto" />
      <div className="flex flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto">
        {aboutSectionIcons.map(({ section, icon }) => (
          <AboutSection icon={icon} idx={section} key={uuid()} />
        ))}
      </div>
    </div>
  );
}

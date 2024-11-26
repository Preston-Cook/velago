import { AboutSection } from '@/components/AboutSection';
import { Separator } from '@/components/ui/Separator';
import { aboutSectionIcons } from '@/config/misc';
import { getTranslations } from 'next-intl/server';
import { v4 as uuid } from 'uuid';

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="flex flex-col gap-12 py-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
          {t('title')}
        </h1>
        <h3 className="mx-auto text-center text-lg sm:max-w-[90%] md:max-w-[80%] md:flex-row lg:max-w-[60%]">
          {t('subheading')}
        </h3>
      </div>
      <Separator className="mx-auto bg-primary sm:max-w-[90%] md:max-w-[80%] md:flex-row lg:max-w-[60%]" />
      <div className="mx-auto flex flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
        {aboutSectionIcons.map(({ section, icon }) => (
          <AboutSection icon={icon} idx={section} key={uuid()} />
        ))}
      </div>
    </div>
  );
}

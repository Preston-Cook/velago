import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AboutSectionProps {
  icon: LucideIcon;
  idx: number;
}

export function AboutSection({ idx, icon: Icon }: AboutSectionProps) {
  const t = useTranslations('About');

  return (
    <div
      className={`flex w-full gap-8 rounded bg-secondary p-4 lg:bg-transparent ${idx % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <div className="flex flex-col gap-8 lg:w-[70%] xl:w-[80%]">
        <h2
          className={`flex w-full items-center justify-center gap-x-2 text-3xl text-primary md:text-4xl ${'lg:justify-start'}`}
        >
          <Icon className="lg:hidden" size={30} />
          {t(`section${idx}.title`)}
        </h2>
        <div className="text-center lg:text-left">
          {t(`section${idx}.text`)}
        </div>
      </div>
      <div className="hidden w-8 flex-1 rounded bg-secondary p-8 lg:block">
        <Icon size={30} className="h-full w-full text-primary" />
      </div>
    </div>
  );
}

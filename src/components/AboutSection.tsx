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
      className={`flex gap-8 w-full ${idx % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <div className="flex flex-col gap-8 lg:w-[80%]">
        <h2
          className={`w-full text-3xl md:text-4xl text-primary flex items-center justify-center  gap-x-2 ${'lg:justify-start'}`}
        >
          <Icon className="lg:hidden" size={30} />
          {t(`section${idx}.title`)}
        </h2>
        <div className="text-center lg:text-left">
          {t(`section${idx}.text`)}
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-secondary rounded p-8 w-8">
        <Icon size={30} className="text-primary w-full h-full" />
      </div>
    </div>
  );
}

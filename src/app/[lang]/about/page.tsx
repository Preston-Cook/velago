import { AboutHeader } from '@/components/AboutHeader';
import { AboutSection } from '@/components/AboutSection';
import { Separator } from '@/components/ui/separator';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuid } from 'uuid';

interface AboutPageProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: AboutPageProps) {
  const { lang } = params;

  const dic = await getDictionary(lang);
  const { title, subheading, content } = dic.pages.about;

  return (
    <div className="px-4 py-3">
      <div className="flex flex-col justify-around pb-4 pt-8 sm:px-6 lg:px-8">
        <AboutHeader title={title} subheading={subheading} />
        <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary" />
      </div>
      <div>
        <div className="mx-auto flex max-w-[80%] flex-col py-8">
          {content.map((section, i) => {
            const { header, text } = section;

            return (
              <AboutSection
                iconIdx={i}
                key={uuid()}
                header={header}
                text={text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

import Cta from '@/components/Cta';
import FaqSection from '@/components/Faq';
import { Separator } from '@/components/ui/separator';
import Content from '@/components/Content';
import { Locale } from '@/i18n.config';

interface HomePageProps {
  params: {
    lang: Locale;
  };
}

export default function Page({ params }: HomePageProps) {
  const { lang } = params;

  return (
    <div className="px-4 py-3">
      <div className="flex flex-col justify-around gap-10 py-8 sm:px-6 lg:px-8">
        <Cta lang={lang} />
        <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary" />
        <Content lang={lang} />
        <FaqSection lang={lang} />
      </div>
    </div>
  );
}

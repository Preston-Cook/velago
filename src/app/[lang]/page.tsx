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

export default function Home({ params }: HomePageProps) {
  const { lang } = params;

  return (
    <div className="py-3 px-4">
      <div className="sm:px-6 lg:px-8 py-8 flex flex-col justify-around gap-10">
        <Cta lang={lang} />
        <Separator className="bg-primary w-[80%] min-w-[200px] mx-auto" />
        <Content lang={lang} />
        <FaqSection lang={lang} />
      </div>
    </div>
  );
}

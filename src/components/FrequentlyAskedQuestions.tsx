import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/Accordion';

export function FrequentlyAskedQuestions() {
  const t = useTranslations('Home.faq');

  return (
    <div className="flex flex-col gap-8 w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary mx-auto text-center">
        {t('title')}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {[...Array(5)].map((_, i) => (
          <AccordionItem key={uuid()} value={`item-${i + 1}`}>
            <AccordionTrigger>{t(`question${i + 1}.title`)}</AccordionTrigger>
            <AccordionContent>{t(`question${i + 1}.text`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

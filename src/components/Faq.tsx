import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { v4 as uuidv4 } from 'uuid';

interface FaqSectionProps {
  lang: Locale;
}

export default async function FaqSection({ lang }: FaqSectionProps) {
  const dic = (await getDictionary(lang)).pages.home.faq;

  return (
    <section id="faq">
      <div className="mx-auto max-w-screen-xl py-6">
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl font-bold text-center text-primary">
          {dic.title}
        </h2>
        <Accordion
          type="single"
          collapsible
          className="bg-secondary p-4 rounded-md border"
        >
          {dic.questions.map((q) => (
            <AccordionItem key={uuidv4()} value="item-1">
              <AccordionTrigger className="text-sm md:text-base">
                {q.question}
              </AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

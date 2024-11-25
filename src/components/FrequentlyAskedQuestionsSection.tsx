import { useTranslations } from 'next-intl';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/Accordion';

interface FrequentlyAskedQuestionsSectionProps {
  className?: string;
  idx: number;
}

export function FrequentlyAskedQuestionsSection({
  className,
  idx,
}: FrequentlyAskedQuestionsSectionProps) {
  const t = useTranslations('Home.faq');

  return (
    <AccordionItem className={className} value={`item-${idx + 1}`}>
      <AccordionTrigger>{t(`question${idx + 1}.title`)}</AccordionTrigger>
      <AccordionContent>{t(`question${idx + 1}.text`)}</AccordionContent>
    </AccordionItem>
  );
}

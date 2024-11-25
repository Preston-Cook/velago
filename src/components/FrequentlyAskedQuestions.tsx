import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';
import { FrequentlyAskedQuestionsSection } from './FrequentlyAskedQuestionsSection';
import { Accordion } from './ui/Accordion';

export function FrequentlyAskedQuestions() {
  const t = useTranslations('Home.faq');

  return (
    <div className="flex flex-col gap-8 w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary mx-auto text-center">
        {t('title')}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-secondary p-4 rounded"
      >
        {[...Array(5)].map((_, i) => (
          <FrequentlyAskedQuestionsSection
            className={
              i !== 0
                ? 'border border-l-transparent border-b-transparent border-r-transparent border-t-primary'
                : ''
            }
            key={uuid()}
            idx={i}
          />
        ))}
      </Accordion>
    </div>
  );
}

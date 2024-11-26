import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';
import { FrequentlyAskedQuestionsSection } from './FrequentlyAskedQuestionsSection';
import { Accordion } from './ui/Accordion';

export function FrequentlyAskedQuestions() {
  const t = useTranslations('Home.faq');

  return (
    <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
      <h2 className="mx-auto text-center text-3xl text-primary md:text-4xl">
        {t('title')}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded bg-secondary p-4"
      >
        {[...Array(5)].map((_, i) => (
          <FrequentlyAskedQuestionsSection
            className={
              i !== 0
                ? 'border border-b-transparent border-l-transparent border-r-transparent border-t-primary'
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

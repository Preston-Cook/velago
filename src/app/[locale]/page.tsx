import { CallToAction } from '@/components/CallToAction';
import { FrequentlyAskedQuestions } from '@/components/FrequentlyAskedQuestions';
import { Info } from '@/components/Info';
import { Partner } from '@/components/Partner';
import { Separator } from '@/components/ui/Separator';

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <CallToAction />
      <Separator className="mx-auto bg-primary sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]" />
      <Partner />
      <Info />
      <FrequentlyAskedQuestions />
    </div>
  );
}

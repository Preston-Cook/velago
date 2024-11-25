import { CallToAction } from '@/components/CallToAction';
import { FrequentlyAskedQuestions } from '@/components/FrequentlyAskedQuestions';
import { Info } from '@/components/Info';
import { Partner } from '@/components/Partner';
import { Separator } from '@/components/ui/Separator';

export default function Home() {
  return (
    <div className="flex flex-col py-12 gap-12">
      <CallToAction />
      <Separator className="bg-primary sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto" />
      <Partner />
      <Info />
      <FrequentlyAskedQuestions />
    </div>
  );
}

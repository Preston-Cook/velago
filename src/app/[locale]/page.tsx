import { CallToAction } from '@/components/CallToAction';
import { Partner } from '@/components/Partner';
import { Separator } from '@/components/ui/Separator';

export default function Home() {
  return (
    <div className="flex flex-col py-8 gap-12">
      <CallToAction />
      <Separator className="bg-primary w-[80%] mx-auto" />
      <Partner />
    </div>
  );
}

'use client';

import CallToAction from '@/components/CallToAction';
import FaqSection from '@/components/Faq';
import { Separator } from '@/components/ui/separator';
import Content from '@/components/Content';

export default function Home() {
  return (
    <div className="py-3 px-4">
      <div className="sm:px-6 lg:px-8 py-8 flex flex-col justify-around gap-10">
        <CallToAction />
        <Separator className="bg-primary w-[80%] min-w-[200px] mx-auto" />
        <Content />

        <FaqSection />
      </div>
    </div>
  );
}

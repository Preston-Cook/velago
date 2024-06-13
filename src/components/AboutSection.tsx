import React, { ReactElement } from 'react';
import { Goal, UserRoundPlus, Globe } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface AboutSectionProps {
  header: string;
  text: string;
  iconIdx: number;
}

const icons = [<Goal key={uuid()} />, <UserRoundPlus key={uuid()} />];

export function AboutSection({ header, text, iconIdx }: AboutSectionProps) {
  const icon = icons[iconIdx as keyof typeof icons];

  const smallIcon = React.cloneElement(icon as ReactElement, { size: 27.5 });
  const largeIcon = React.cloneElement(icon as ReactElement, { size: 180 });

  return (
    <section>
      <div className="mx-auto flex max-w-screen-xl gap-8 px-4 lg:px-6 lg:py-6">
        <div className="sm:text-lg md:w-[60%]">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-4xl font-bold tracking-tight text-primary">
            <div className="w-full text-center md:text-left">{header}</div>
            <div className="md:hidden">{smallIcon}</div>
          </h2>
          <p className="my-8">&emsp;{text}</p>
        </div>
        <div className="hidden flex-1 items-start justify-center rounded-lg py-10 text-primary md:flex">
          <div className="rounded-lg bg-secondary px-5 pb-5 pt-5">
            {largeIcon}
          </div>
        </div>
      </div>
    </section>
  );
}

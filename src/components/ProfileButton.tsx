'use client';

import { LocaleLink } from './LocaleLink';
import { Button } from './ui/button';
import { UserRound } from 'lucide-react';

export default function ProfileButton() {
  return (
    <LocaleLink href="/profile">
      <Button className="bg-background text-white">
        <UserRound className="mr-2 h-[1.2rem] w-[1.2rem]" />
        Profile
      </Button>
    </LocaleLink>
  );
}

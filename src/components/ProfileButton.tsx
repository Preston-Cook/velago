'use client';

import { LocaleLink } from './LocaleLink';
import { Button } from './ui/button';
import { UserRound } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SignOutButton } from './SignOutButton';

export default function ProfileButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary text-white">
          <UserRound className="mr-2 h-[1.2rem] w-[1.2rem]" />
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[190px]">
        <div className="flex flex-col items-end">
          <p>Saved Resources</p>
          <p>My Profile</p>
          <p>Settings</p>
          <p>Sign Out</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

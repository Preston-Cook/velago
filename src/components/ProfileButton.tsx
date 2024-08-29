'use client';

import { Separator } from '@radix-ui/react-separator';
import { UserRound } from 'lucide-react';
import { SignOutButton } from './SignOutButton';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function ProfileButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary text-white">
          <UserRound className="mr-2 h-[1.2rem] w-[1.2rem]" />
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-[8000] w-[190px]">
        <div className="flex flex-col items-end">
          <Separator className="mx-auto h-[1px] w-[100%] bg-primary" />
          <p>Saved Resources</p>
          <p>My Profile</p>
          <p>Settings</p>
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}

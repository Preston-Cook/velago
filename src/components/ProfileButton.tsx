'use client';

import { LocaleLink } from './LocaleLink';
import { Button } from './ui/button';
import { UserRound } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { useEffect, useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { SignOutButton } from './SignOutButton';

export default function ProfileButton() {
  const userInfo = useState();
  const supabase = createSbBrowserClient();

  useEffect(
    function () {
      async function getCurrentUser() {
        const user = await supabase.auth.getUser();
      }
    },
    [supabase.auth],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary text-white">
          <UserRound className="mr-2 h-[1.2rem] w-[1.2rem]" />
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-[4000] w-[190px]">
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

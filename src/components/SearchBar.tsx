'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  searchPlaceholders: string[];
}

export default function SearchBar({ searchPlaceholders }: SearchBarProps) {
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);

  return (
    <div className="flex max-w-md items-center gap-2 mx-auto mt-10">
      <div className="relative mx-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={`${searchPlaceholders[randomIndex]}...`}
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px] placeholder:ml-auto"
        />
      </div>
      {/* <Input
        className="w-[1000px] bg-secondary"
        type="text"
        placeholder={`${searchPlaceholders[randomIndex]}...`}
      />
      <Button type="submit">
        <Search />
      </Button> */}
    </div>
  );
}

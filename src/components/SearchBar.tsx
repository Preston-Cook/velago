'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/Button';

interface SearchBarProps {
  searchPlaceholders: string[];
}

export default function SearchBar({ searchPlaceholders }: SearchBarProps) {
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);

  return (
    <div className="flex max-w-md items-center space-x-2 mx-auto mt-10">
      <Input
        className="w-[1000px] bg-secondary"
        type="text"
        placeholder={`${searchPlaceholders[randomIndex]}...`}
      />
      <Button type="submit">
        <Search />
      </Button>
    </div>
  );
}

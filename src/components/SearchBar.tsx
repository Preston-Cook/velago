'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';
import { FilterButton } from './FilterButton';
import { type ChangeEvent, useState } from 'react';
import { SearchInput } from './SearchInput';

interface SearchBarProps {
  searchPlaceholders: string[];
}

export default function SearchBar({ searchPlaceholders }: SearchBarProps) {
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
  const [radius, setRadius] = useState(10);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  async function getSuggestions() {}

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {}

  return (
    <div className="flex max-w-md gap-2 mx-auto mt-10">
      <FilterButton radius={radius} />
      <div className="relative mx-auto flex-1">
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
        {/* <Input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder={`${searchPlaceholders[randomIndex]}...`}
          className="rounded-lg bg-secondary pl-8 placeholder:ml-auto"
        /> */}
        <SearchInput
          query={query}
          suggestions={suggestions}
          placeholder={`${searchPlaceholders[randomIndex]}...`}
        />
      </div>
    </div>
  );
}

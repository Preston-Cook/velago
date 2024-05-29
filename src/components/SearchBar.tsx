'use client';

import { FilterButton } from './FilterButton';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LocationSearch } from './LocationSearch';
import { useLocale } from '@/hooks/useLanguage';
import { start as nprogressStart } from 'nprogress';

interface SearchBarProps {
  placeholder: string;
  lang: string;
}

export default function SearchBar({ placeholder, lang }: SearchBarProps) {
  const [radius, setRadius] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  function handleRadiusChange(e: number[]) {
    setRadius(e[0]);
  }

  function handleSelectValue(e: string) {
    nprogressStart();
    router.push(`/map?q=${encodeURI(e)}&radius=${radius}`);
  }

  function handleQueryChagne(e: string) {
    setQuery((_prev) => e);
  }

  return (
    <div className="flex max-w-md gap-2 mx-auto mt-10 justify-center items-center">
      <FilterButton handleChange={handleRadiusChange} radius={radius} />
      <div className="mx-auto flex-1">
        <div className="relative">
          <LocationSearch
            query={query}
            onQueryChange={handleQueryChagne}
            onSelectValue={handleSelectValue}
            errorText={'Something went wrong'}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}

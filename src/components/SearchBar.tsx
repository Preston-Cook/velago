'use client';

import { FilterButton } from './FilterButton';
import { type ChangeEvent, useState } from 'react';
import { SearchInput } from './SearchInput';
import { AutoCompleteResponse, Suggestion } from '@/types/Suggestion';

interface SearchBarProps {
  searchPlaceholders: string[];
  lang: string;
}

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT as string;

export default function SearchBar({
  searchPlaceholders,
  lang,
}: SearchBarProps) {
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
  const [radius, setRadius] = useState(10);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log(GOOGLE_MAPS_API_KEY);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // get new value
    const { value } = e.currentTarget;

    // set new state
    setQuery((_prev) => value);

    if (error) {
      setError((_prev) => null);
    }

    // fetch new suggestions
    if (value) {
      const res = await fetch(GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        },
        method: 'POST',
        body: JSON.stringify({
          input: value,
          languageCode: lang,
        }),
      });

      // ensure res is ok
      if (!res.ok) {
        setError((_prev) => 'Something went wrong');
        return;
      }

      // set new suggestions
      const data = (await res.json()) as AutoCompleteResponse;
      const { suggestions } = data;
      setSuggestions((_prev) => suggestions);
    }
  }

  return (
    <div className="flex max-w-md gap-2 mx-auto mt-10 justify-center items-center">
      <FilterButton radius={radius} />
      <div className="relative mx-auto flex-1">
        <div className="relative">
          <SearchInput
            error={error}
            handleChange={handleChange}
            query={query}
            suggestions={suggestions}
            placeholder={`${searchPlaceholders[randomIndex]}...`}
          />
        </div>
      </div>
    </div>
  );
}

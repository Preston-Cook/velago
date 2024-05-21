'use client';

import { FilterButton } from './FilterButton';
import { type ChangeEvent, useState, FormEvent } from 'react';
import { SearchInput } from './SearchInput';
import { AutoCompleteResponse, Suggestion } from '@/types/Suggestion';
import OutsideAlerter from './OutsideAlerter';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder: string;
  lang: string;
}

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT as string;

export default function SearchBar({ placeholder, lang }: SearchBarProps) {
  const router = useRouter();
  const [radius, setRadius] = useState(10);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      const { suggestions: newSuggestions } = data;
      setSuggestions((_prev) => newSuggestions);
      return;
    }

    setSuggestions([]);
  }

  function selectValue(e: string) {
    router.push(`/map?q=${encodeURI(e)}&radius=${radius}`);
  }

  async function handleFocus() {
    if (!query) return;

    const res = await fetch(GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      },
      method: 'POST',
      body: JSON.stringify({
        input: query,
        languageCode: lang,
      }),
    });
    if (!res.ok) {
      setError((_prev) => 'Something went wrong');
      return;
    }
    // set new suggestions
    const data = (await res.json()) as AutoCompleteResponse;
    const { suggestions: newSuggestions } = data;
    setSuggestions((_prev) => newSuggestions);
  }

  return (
    <div className="flex max-w-md gap-2 mx-auto mt-10 justify-center items-center">
      <FilterButton radius={radius} />
      <div className="mx-auto flex-1">
        <div className="relative">
          <OutsideAlerter func={() => setSuggestions([])}>
            <SearchInput
              handleFocus={handleFocus}
              selectValue={selectValue}
              error={error}
              handleChange={handleChange}
              query={query}
              suggestions={suggestions}
              placeholder={`${placeholder}...`}
            />
          </OutsideAlerter>
        </div>
      </div>
    </div>
  );
}

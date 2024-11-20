'use client';

import { useLocationApproximation } from '@/app/context/LocationProvider';
import { getLocationSuggestions } from '@/lib/getLocationSuggestions';
import { Locale, Suggestion } from '@/types';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { OutsideAlerter } from './OutsideAlerter';
import { SearchInput } from './SearchInput';

interface HandleSelectValueParams {
  placeId: string;
  text: string;
}

interface LocationSearchProps {
  query: string;
  errorText: string;
  placeholder: string;
  onSelectValue(e: HandleSelectValueParams): Promise<void>;
  onQueryChange(e: string): void;
}

export function LocationSearch({
  query,
  errorText,
  placeholder,
  onSelectValue,
  onQueryChange,
}: LocationSearchProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string>('');
  const locApprox = useLocationApproximation();
  const { locale }: { locale: Locale } = useParams();

  function handleClearSuggestions() {
    setSuggestions(() => []);
  }

  async function handleFocus() {
    const q = query
      ? query
      : `
${locApprox?.city}, ${locApprox?.region}, ${locApprox?.countryCode}`;

    const newSuggestions = await getLocationSuggestions({
      locale,
      q,
    });

    setSuggestions(() => newSuggestions);
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // get new value

    const { value: q } = e.currentTarget;

    // set new state
    onQueryChange(q);

    if (error) {
      setError(errorText);
    }

    // fetch new suggestions
    if (q) {
      const newSuggestions = await getLocationSuggestions({ q, locale });
      setSuggestions(() => newSuggestions);
      return;
    }

    handleClearSuggestions();
  }

  async function handleSelectValue({ placeId, text }: HandleSelectValueParams) {
    await onSelectValue({ placeId, text });
    setSuggestions(() => []);
  }

  return (
    <OutsideAlerter func={handleClearSuggestions}>
      <SearchInput
        handleFocus={handleFocus}
        selectValue={handleSelectValue}
        error={error}
        handleChange={handleChange}
        query={query}
        suggestions={suggestions}
        placeholder={`${placeholder}...`}
      />
    </OutsideAlerter>
  );
}

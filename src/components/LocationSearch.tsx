'use client';

import { SearchInput } from './SearchInput';
import OutsideAlerter from './OutsideAlerter';
import { Suggestion } from '@/types/Suggestion';
import { useState } from 'react';
import { useLocationApproximation } from '@/context/LocationProvider';
import { ChangeEvent } from 'react';
import { getLocationSuggestions } from '@/lib/getLocationSuggestions';
import { useLocale } from '@/hooks/useLanguage';

interface LocationSearchProps {
  query: string;
  errorText: string;
  placeholder: string;
  onSelectValue(e: string): void;
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
  const { locale: lang } = useLocale();

  function handleClearSuggestions() {
    setSuggestions((_prev) => []);
  }

  async function handleFocus() {
    let q;

    q = query
      ? query
      : `
    ${locApprox?.city}, ${locApprox?.region}, ${locApprox?.countryCode}`;

    const newSuggestions = await getLocationSuggestions({
      lang,
      q,
    });

    setSuggestions((_prev) => newSuggestions);
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
      const newSuggestions = await getLocationSuggestions({ q, lang });
      setSuggestions((_prev) => newSuggestions);
      return;
    }

    handleClearSuggestions();
  }

  return (
    <OutsideAlerter func={handleClearSuggestions}>
      <SearchInput
        handleFocus={handleFocus}
        selectValue={onSelectValue}
        error={error}
        handleChange={handleChange}
        query={query}
        suggestions={suggestions}
        placeholder={`${placeholder}...`}
      />
    </OutsideAlerter>
  );
}

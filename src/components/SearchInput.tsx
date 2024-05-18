import { CircleAlert } from 'lucide-react';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ChangeEvent } from 'react';
import { Suggestion } from '@/types/Suggestion';

interface SearchInputProps {
  error: string | null;
  query: string;
  suggestions: Suggestion[];
  placeholder: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  selectValue(e: string): void;
  handleFocus(): void;
  handleUnfocus(): void;
}

export function SearchInput({
  query,
  error,
  suggestions,
  placeholder,
  selectValue,
  handleChange,
  handleFocus,
}: SearchInputProps) {
  return (
    <div className="absolute -top-[22px] w-full">
      <Command className="rounded-lg border bg-secondary focus-within:border-primary">
        <CommandInput
          name="q"
          onFocus={handleFocus}
          placeholder={placeholder}
          value={query}
          onChangeCapture={handleChange}
        />
        <CommandList>
          {error ? (
            <CommandItem className="text-destructive" disabled>
              <span className="mr-2">
                <CircleAlert />
              </span>
              Something went wrong
            </CommandItem>
          ) : (
            suggestions?.map((el) => (
              <CommandItem
                className=" text-left"
                onSelect={selectValue}
                key={el.placePrediction.placeId}
              >
                {el.placePrediction.text.text}
              </CommandItem>
            ))
          )}
        </CommandList>
      </Command>
    </div>
  );
}

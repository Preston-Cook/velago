import { CircleAlert } from 'lucide-react';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { Suggestion } from '@/types';
import { ChangeEvent } from 'react';

interface HandleSelectValueParams {
  placeId: string;
  text: string;
}

interface SearchInputProps {
  error: string | null;
  query: string;
  suggestions: Suggestion[];
  placeholder: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  selectValue(e: HandleSelectValueParams): Promise<void>;
  handleFocus(): void;
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
    <div className="absolute -top-[22px] z-[50] w-full">
      <Command className="rounded-lg border bg-secondary focus-within:border-primary">
        <CommandInput
          name="q"
          onFocus={handleFocus}
          placeholder={placeholder}
          value={query}
          onChangeCapture={handleChange}
        />
        <CommandList className="z-50">
          {error ? (
            <CommandItem className="text-destructive" disabled>
              <span className="mr-2">
                <CircleAlert />
              </span>
              Something went wrong
            </CommandItem>
          ) : (
            suggestions?.map((el) => {
              const {
                placePrediction: { placeId },
              } = el;

              return (
                <CommandItem
                  className="text-left"
                  onSelect={() =>
                    selectValue({ placeId, text: el.placePrediction.text.text })
                  }
                  key={placeId}
                >
                  {el.placePrediction.text.text}
                </CommandItem>
              );
            })
          )}
        </CommandList>
      </Command>
    </div>
  );
}

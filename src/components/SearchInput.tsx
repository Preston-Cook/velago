import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

interface SearchInputProps {
  query: string;
  suggestions: string[];
  placeholder: string;
}

export function SearchInput({
  query,
  suggestions,
  placeholder,
}: SearchInputProps) {
  return (
    <Command className="rounded-lg border">
      <CommandInput placeholder={placeholder} />
      <CommandList className="">
        <CommandItem>
          <Calendar className="mr-2 h-4 w-4" />
        </CommandItem>
      </CommandList>
    </Command>
  );
}

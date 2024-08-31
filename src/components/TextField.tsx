import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormEvent } from 'react';
import { Control } from 'react-hook-form';

interface TextFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  className?: string;
  onChange?(e: FormEvent<HTMLDivElement>): void;
}

export function TextField({
  className,
  control,
  name,
  placeholder,
  label,
  type = 'text',
  onChange,
}: TextFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, 'mt-4')} onChange={onChange}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="block w-full bg-secondary"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

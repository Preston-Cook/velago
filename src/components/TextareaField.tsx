import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';
import { Textarea } from './ui/textarea';

interface TextareaFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  className?: string;
  rows?: number;
}

export function TextareaField({
  control,
  name,
  placeholder,
  label,
  rows = 3,
  className,
}: TextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              rows={rows}
              className={cn(className, 'block w-full bg-secondary')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

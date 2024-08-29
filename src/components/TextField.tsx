import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';

interface TextFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  className?: string;
}

export function TextField({
  control,
  name,
  placeholder,
  label,
  type = 'text',
}: TextFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
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

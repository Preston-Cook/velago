'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import formatPhone from '@/lib/formatPhone';
import contactFormSchema from '@/schemas/contactSchema';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButton';

const fieldObjs = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Aaron',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Schwartz',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@velago.com',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '(123) 456-7890',
  },
];

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const { control, setValue, handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      toast({
        title: 'Success!',
        description: 'Your message has been sent to Velago!',
      });
      reset();
    } else {
      toast({
        className: 'bg-secondary',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {fieldObjs.map((fieldObj) => (
            // eslint-disable-next-line react/jsx-key
            <FormField
              control={control}
              name={
                fieldObj.name as 'firstName' | 'lastName' | 'email' | 'phone'
              }
              render={({ field }) =>
                fieldObj.name === 'phone' ? (
                  <FormItem
                    onChange={(e) => {
                      const { target } = e;
                      // @ts-expect-error value prop exists
                      const { value }: { value: string } = target;
                      setValue('phone', formatPhone(value));
                    }}
                  >
                    <FormLabel>{fieldObj.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fieldObj.placeholder}
                        {...field}
                        className="block w-full bg-secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : (
                  <FormItem>
                    <FormLabel>{fieldObj.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fieldObj.placeholder}
                        {...field}
                        className="block w-full bg-secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
          ))}
        </div>
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Message Here"
                  {...field}
                  rows={6}
                  className="block w-full bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full" />
        <div className="text-center">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}

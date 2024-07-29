'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import formatPhone from '@/lib/formatPhone';
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
import { phoneRegex } from '@/lib/phoneRegex';

interface ContactFormProps {
  validation: {
    firstName: {
      min: string;
      max: string;
    };
    lastName: {
      min: string;
      max: string;
    };
    phone: {
      refine: string;
    };
    email: {
      email: string;
    };
    message: {
      min: string;
      max: string;
    };
  };
  dic: {
    title: string;
    description: string;
    labels: string[];
    messagePlaceholder: string;
    toast: {
      success: {
        title: string;
        description: string;
      };
      error: {
        title: string;
        description: string;
      };
    };
    submit: string;
  };
}

export default function ContactForm({ validation, dic }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fieldObjs = [
    {
      name: 'firstName',
      label: dic.labels[0],
      placeholder: 'Aaron',
    },
    {
      name: 'lastName',
      label: dic.labels[1],
      placeholder: 'Swartz',
    },
    {
      name: 'email',
      label: dic.labels[2],
      placeholder: 'example@velago.com',
    },
    {
      name: 'phone',
      label: dic.labels[3],
      placeholder: '(123) 456-7890',
    },
  ];

  const contactFormSchema = z.object({
    firstName: z
      .string()
      .min(2, {
        message: validation.firstName.min,
      })
      .max(50, {
        message: validation.firstName.max,
      }),
    lastName: z
      .string()
      .min(2, {
        message: validation.lastName.min,
      })
      .max(50, {
        message: validation.lastName.max,
      }),
    phone: z.string().refine((value) => phoneRegex.test(value), {
      message: validation.phone.refine,
    }),
    email: z.string().email(validation.email.email),
    message: z
      .string()
      .min(10, {
        message: validation.message.min,
      })
      .max(300, {
        message: validation.message.max,
      }),
  });

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
    const res = await fetch(`/api/contacts`, {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      toast({
        title: dic.toast.success.title,
        description: dic.toast.success.description,
      });
      reset();
    } else {
      toast({
        title: dic.toast.error.title,
        description: dic.toast.error.description,
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
              <FormLabel>{dic.labels[4]}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={dic.messagePlaceholder}
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
          <SubmitButton classname="w-full md:w-[50%]" isLoading={isLoading}>
            {dic.submit}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}

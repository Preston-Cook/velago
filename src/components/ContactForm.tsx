'use client';

import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import formatPhone from '@/lib/formatPhone';
import { phoneRegex } from '@/lib/phoneRegex';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from './SubmitButton';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';

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
    const res = await fetch('/api/contacts', {
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

  function handlePhoneChange(e: FormEvent<HTMLDivElement>) {
    const { target } = e;
    // @ts-expect-error value prop exists
    const { value }: { value: string } = target;
    setValue('phone', formatPhone(value));
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <TextField
            control={control}
            name="firstName"
            placeholder="Aaron"
            label={dic.labels[0]}
          />
          <TextField
            control={control}
            name="lastName"
            placeholder="Swartz"
            label={dic.labels[1]}
          />
        </div>
        <TextField
          control={control}
          name="email"
          placeholder={'example@velago.com'}
          label={dic.labels[3]}
        />
        <TextField
          control={control}
          name="phone"
          placeholder={fieldObjs[3].placeholder}
          label={fieldObjs[3].label}
          onChange={handlePhoneChange}
        />
        <div className="mt-8">
          <TextareaField
            control={control}
            name="message"
            rows={6}
            placeholder={dic.messagePlaceholder}
            label={dic.labels[4]}
          />
        </div>
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

'use client';

import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from './SubmitButton';
import { useState } from 'react';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { useToast } from '@/hooks/useToast';
import { useLocale } from '@/hooks/useLocale';
import { useRouter } from 'next/navigation';
import { TextField } from './TextField';

interface OrganizationSignInFormProps {
  dic: {
    title: string;
    description: string;
    labels: string[];
    noAccount: {
      text: string;
      link: string;
    };
    userAccount: {
      text: string;
      link: string;
    };
    button: {
      text: string;
    };
    validation: {
      email: {
        required: string;
        invalid: string;
      };
      password: {
        required: string;
        invalid: string;
      };
    };
  };
  validation: {
    email: {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      invalid: string;
    };
  };
}

export function OrganizationSignInForm({
  dic,
  validation,
}: OrganizationSignInFormProps) {
  const sbBrowserClient = createSbBrowserClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToastError } = useToast();
  const { locale } = useLocale();
  const router = useRouter();

  const organizationSignInFormSchema = z.object({
    email: z
      .string()
      .min(1, { message: validation.email.required })
      .email({ message: validation.email.invalid }),
    password: z.string().min(1, { message: 'Password Required' }),
  });

  const form = useForm<z.infer<typeof organizationSignInFormSchema>>({
    resolver: zodResolver(organizationSignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit: handleSubmitHook } = form;

  async function handleSubmit({
    email,
    password,
  }: z.infer<typeof organizationSignInFormSchema>) {
    setIsLoading(true);

    // check if user with email exists
    const res = await fetch(`/api/users?email=${email}`);

    if (res.status === 404) {
      showToastError({
        title: 'Uh oh! Account does not exist',
        description: 'There is no account with this email',
      });
      setIsLoading(false);
      return;
    }

    const { user } = await res.json();

    console.log(JSON.stringify(user));
    console.log(user.role.name === 'organization');

    if (user.role.name !== 'organization' && user.role.name !== 'admin') {
      console.log('I am here');
      showToastError({
        title: 'Uh oh! Organization account does not exist',
        description:
          'There is no organization account associated with this email',
      });
      setIsLoading(false);
      return;
    }

    const { error } = await sbBrowserClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToastError({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
      });
      setIsLoading(false);
      return;
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
          <TextField
            control={control}
            placeholder="velago@example.com"
            label={dic.labels[0]}
            type="email"
            name="email"
          />
          <TextField
            control={control}
            placeholder="Password"
            label={dic.labels[1]}
            type="password"
            name="password"
          />
        </div>
        <div>
          <SubmitButton classname="w-full" isLoading={isLoading} type="submit">
            Sign In
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}

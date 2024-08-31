'use client';

import { useLocale } from '@/hooks/useLocale';
import { useToast } from '@/hooks/useToast';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import type { OrgSignInDic } from '@/types/DicTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from './SubmitButton';
import { TextField } from './TextField';
import { Form } from './ui/form';

interface OrganizationSignInFormProps {
  dic: OrgSignInDic;
}

export function OrganizationSignInForm({ dic }: OrganizationSignInFormProps) {
  const sbBrowserClient = useMemo(() => createSbBrowserClient(), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToastError } = useToast();
  const { locale } = useLocale();
  const router = useRouter();
  const { validation } = dic;

  // Memoize schema creation
  const organizationSignInFormSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, { message: validation.email.required })
          .email({ message: validation.email.invalid }),
        password: z.string().min(1, { message: validation.password.required }),
      }),
    [validation],
  );

  // Use useForm with memoized schema
  const form = useForm<z.infer<typeof organizationSignInFormSchema>>({
    resolver: zodResolver(organizationSignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit } = form;

  const handleFormSubmit = useCallback(
    async (data: z.infer<typeof organizationSignInFormSchema>) => {
      const { email, password } = data;
      setIsLoading(true);

      try {
        const res = await fetch(`/api/users?email=${email}`);

        if (res.status === 404) {
          showToastError({
            title: 'Uh oh! Account does not exist',
            description: 'There is no account with this email',
          });
          return;
        }

        const { user } = await res.json();

        if (user.role.name !== 'organization' && user.role.name !== 'admin') {
          showToastError({
            title: 'Uh oh! Organization account does not exist',
            description:
              'There is no organization account associated with this email',
          });
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
          return;
        }

        router.push(`/${locale}/dashboard`);
        router.refresh();
      } catch (error) {
        showToastError({
          title: 'Uh oh! Something went wrong',
          description: 'There was a problem with your request',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [sbBrowserClient, showToastError, router, locale],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            {dic.button.text}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}

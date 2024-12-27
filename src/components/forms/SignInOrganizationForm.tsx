'use client';

import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createOrganizationSignInSchema } from '@/schemas/organizationSignInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Separator } from '../ui/Separator';

export function SignInOrganizationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const signInOrganizationSchema = createOrganizationSignInSchema(t);

  const form = useForm<z.infer<typeof signInOrganizationSchema>>({
    resolver: zodResolver(signInOrganizationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  async function handleSubmit() {
    setIsSubmitting(true);

    // TODO: sign in user and redirect to dashboard
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('OrganizationSignIn.labels.email')}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary"
                    type="email"
                    placeholder={t('OrganizationSignIn.placeholders.email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('OrganizationSignIn.labels.password')}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary"
                    type="password"
                    placeholder={t('OrganizationSignIn.placeholders.password')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={!form.formState.isValid || isSubmitting}
          className="w-full"
          type="submit"
        >
          {isSubmitting ? <Spinner /> : t('Contact.submit.text')}
        </Button>
        <Separator className="mx-auto w-[80%] bg-primary" />
      </form>
    </Form>
  );
}

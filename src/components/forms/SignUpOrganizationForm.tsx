'use client';

import { onSubmitAction } from '@/app/[locale]/(auth)/signup/organization/actions';
import { createOrganizationSignUpSchema } from '@/schemas/organizationSignUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Spinner } from '../Spinner';
import { Button } from '../ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Input } from '../ui/Input';
import { PhoneInput } from '../ui/PhoneInput';
import { Separator } from '../ui/Separator';
import { Textarea } from '../ui/Textarea';

export function SignUpOrganizationForm() {
  const t = useTranslations();
  const [state, formAction] = useActionState(onSubmitAction, {
    message: '',
  });
  const { data, status } = useSession();

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const organizationSignUpSchema = createOrganizationSignUpSchema(t);

  const form = useForm<z.infer<typeof organizationSignUpSchema>>({
    resolver: zodResolver(organizationSignUpSchema),
    defaultValues: {
      firstName: state?.fields?.firstName || '',
      lastName: state?.fields?.lastName || '',
      email: state?.fields?.email || '',
      phone: state?.fields?.phone || '',
      message: state?.fields?.message || '',
    },
    mode: 'onChange',
  });

  useEffect(
    function () {
      if (status === 'authenticated' && data?.user) {
        const {
          user: { firstName, lastName, email, phone },
        } = data;

        form.setValue('firstName', firstName ?? '');
        form.setValue('lastName', lastName ?? '');
        form.setValue('email', email ?? '');
        form.setValue('phone', phone ?? '');
      }
    },
    [status, data?.user, data, form],
  );

  useEffect(() => {
    if (state?.message === 'success') {
      toast.success(t('SignUpOrganization.toast.success.title'), {
        description: t('SignUpOrganization.toast.success.description'),
      });
      form.reset();
    }
    setIsSubmitting(false);
  }, [state, form, t]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    setIsSubmitting(true); // Set submitting state before action
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <Form {...form}>
      {state?.issues && (
        <div className="text-red-700">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        className="flex flex-col gap-8"
        onSubmit={handleFormSubmit} // Use handleSubmit here
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t('SignUpOrganization.labels.firstName')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-secondary"
                      placeholder={t(
                        'SignUpOrganization.placeholders.firstName',
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t('SignUpOrganization.labels.lastName')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-secondary"
                      placeholder={t(
                        'SignUpOrganization.placeholders.lastName',
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('SignUpOrganization.labels.email')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="bg-secondary"
                    placeholder={t('SignUpOrganization.placeholders.email')}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('SignUpOrganization.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={isSubmitting}
                    type="phone"
                    defaultCountry="US"
                    placeholder={t('SignUpOrganization.placeholders.phone')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('SignUpOrganization.labels.message')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    className="bg-secondary"
                    placeholder={t('SignUpOrganization.placeholders.message')}
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
          {isSubmitting ? <Spinner /> : t('SignUpOrganization.submit.text')}
        </Button>
        <Separator className="mx-auto w-[80%] bg-primary" />
      </form>
    </Form>
  );
}

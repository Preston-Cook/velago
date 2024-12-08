'use client';

import { onSubmitAction } from '@/app/[locale]/contact/actions';
import { createContactFormSchema } from '@/schemas/contactFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '../ui/Textarea';

export function ContactForm() {
  const t = useTranslations();
  const [state, formAction] = useActionState(onSubmitAction, {
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const contactFormSchema = createContactFormSchema(t);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: state?.fields?.firstName || '',
      lastName: state?.fields?.lastName || '',
      email: state?.fields?.email || '',
      phone: state?.fields?.phone || '',
      message: state?.fields?.message || '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (state?.message === 'success') {
      toast.success(t('Contact.toast.success.title'), {
        description: t('Contact.toast.success.description'),
      });
      form.reset();
      setIsSubmitting(false); // Reset submitting state
    }
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
        <div className="text-destructive">
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
                  <FormLabel>{t('Contact.labels.firstName')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-secondary"
                      placeholder={t('Contact.placeholders.firstName')}
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
                  <FormLabel>{t('Contact.labels.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-secondary"
                      placeholder={t('Contact.placeholders.lastName')}
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
                <FormLabel>{t('Contact.labels.email')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="bg-secondary"
                    placeholder={t('Contact.placeholders.email')}
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
                <FormLabel>{t('Contact.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={isSubmitting}
                    type="phone"
                    defaultCountry="US"
                    placeholder={t('Contact.placeholders.phone')}
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
                <FormLabel>{t('Contact.labels.message')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    className="bg-secondary"
                    placeholder={t('Contact.placeholders.message')}
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
      </form>
    </Form>
  );
}

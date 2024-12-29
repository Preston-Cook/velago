'use client';

import { onSubmitAction } from '@/app/[locale]/map/actions';
import { PhoneInputDialog } from '@/components/PhoneInputDialog';
import { useResourceContext } from '@/context/ResourceProvider';
import { createSendResourceSchema } from '@/schemas/sendResourceFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect, useState } from 'react';
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

interface SendResourceFormProps {
  handleClose(): void;
}

export function SendResourceForm({ handleClose }: SendResourceFormProps) {
  const { selectedResources } = useResourceContext();
  const t = useTranslations();
  const [state, formAction] = useActionState(onSubmitAction, {
    message: '',
  });
  const { data, status } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const sendResourceSchema = createSendResourceSchema(t);

  const form = useForm<z.infer<typeof sendResourceSchema>>({
    resolver: zodResolver(sendResourceSchema),
    defaultValues: {
      phone: state?.fields?.phone || '',
    },
    mode: 'onChange',
  });

  useEffect(
    function () {
      if (status === 'authenticated' && data?.user) {
        const {
          user: { phone },
        } = data;

        form.setValue('phone', phone ?? '');
      }
    },
    [status, data?.user, data, form],
  );

  useEffect(() => {
    if (state?.message === 'success') {
      toast.success(t('Map.toast.success.title'), {
        description: t('Map.toast.success.description'),
      });
      form.reset();
      handleClose();
    }
    setIsSubmitting(false);
  }, [state, form, t, handleClose]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    // add selected resources
    formData.append('selectedResources', JSON.stringify(selectedResources));

    setIsSubmitting(true);
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
        className="flex flex-col gap-8"
        onSubmit={handleFormSubmit} // Use handleSubmit here
      >
        <div className="flex flex-col gap-4">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('Map.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInputDialog
                    disabled={isSubmitting}
                    type="phone"
                    defaultCountry="US"
                    placeholder={t('Map.placeholders.phone')}
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
          className="flex w-full items-center justify-center gap-4"
          type="submit"
        >
          {isSubmitting ? (
            <Spinner />
          ) : (
            <>
              <Send />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

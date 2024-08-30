'use client';

import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from './SubmitButton';
import { TextField } from './TextField';
import { TextareaField } from './TextareaField';

interface OrganizationSignUpFormProps {
  dic: {
    title: string;
    description: string;
    labels: string[];
    signIn: {
      text: string;
      link: string;
    };
    userAccount: {
      text: string;
      link: string;
    };
    descriptionPlaceholder: string;
    additionalInfo: string;
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
    validation: {
      orgName: {
        min: string;
        max: string;
      };
      email: {
        email: string;
      };
      description: {
        min: string;
        max: string;
      };
    };
  };
  validation: {
    orgName: {
      min: string;
      max: string;
    };
    email: {
      email: string;
    };
    description: {
      min: string;
      max: string;
    };
  };
}

export function OrganizationSignUpForm({
  dic,
  validation,
}: OrganizationSignUpFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToastSuccess, showToastError } = useToast();

  // Memoize schema creation to prevent unnecessary re-renders
  const orgSignUpFormSchema = useMemo(
    () =>
      z.object({
        orgName: z
          .string()
          .min(3, { message: validation.orgName.min })
          .max(70, { message: validation.orgName.max }),
        email: z.string().email({ message: validation.email.email }),
        description: z
          .string()
          .min(50, validation.description.min)
          .max(750, validation.description.max),
        additionalInfo: z.string().optional(),
      }),
    [validation],
  );

  // Use react-hook-form with memoized schema
  const form = useForm<z.infer<typeof orgSignUpFormSchema>>({
    resolver: zodResolver(orgSignUpFormSchema),
    defaultValues: {
      orgName: '',
      email: '',
      description: '',
      additionalInfo: '',
    },
  });

  const { reset, control, handleSubmit } = form;

  // Memoize submit handler to avoid re-creation on every render
  const onSubmit = useCallback(
    async (values: z.infer<typeof orgSignUpFormSchema>) => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/signup/organization', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (res.status === 201) {
          showToastSuccess({
            title: dic.toast.success.title,
            description: dic.toast.success.description,
          });
          reset();
        } else {
          showToastError({
            title: dic.toast.error.title,
            description: dic.toast.error.description,
          });
        }
      } catch (error) {
        showToastError({
          title: dic.toast.error.title,
          description: dic.toast.error.description,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dic, showToastSuccess, showToastError, reset],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <TextField
            placeholder="Velago"
            control={control}
            name="orgName"
            label={dic.labels[0]}
          />
          <TextField
            control={control}
            placeholder="velago@example.com"
            label={dic.labels[1]}
            type="email"
            name="email"
          />
          <TextareaField
            control={control}
            placeholder={dic.descriptionPlaceholder}
            label={dic.labels[2]}
            name="description"
          />
          <TextareaField
            control={control}
            placeholder={dic.additionalInfo}
            label={dic.labels[3]}
            name="additionalInfo"
          />
          <div className="text-center">
            <SubmitButton classname="w-full mt-4" isLoading={isLoading}>
              {dic.submit}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}

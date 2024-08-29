'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButton';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { TextField } from './TextField';
import { TextareaField } from './TextareaField';

interface OrganizationSignUpForm {
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
}: OrganizationSignUpForm) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToastSuccess, showToastError } = useToast();

  const orgSignUpFormSchema = z.object({
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
  });

  const form = useForm<z.infer<typeof orgSignUpFormSchema>>({
    resolver: zodResolver(orgSignUpFormSchema),
    defaultValues: {
      orgName: '',
      email: '',
      description: '',
      additionalInfo: '',
    },
  });

  const { reset, control, handleSubmit: handleSubmitHook } = form;

  async function handleSubmit(values: z.infer<typeof orgSignUpFormSchema>) {
    setIsLoading(true);
    const res = await fetch('/api/signup/organization', {
      method: 'POST',
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

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
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
              className="col-span-4"
            />
            <div className="text-center">
              <SubmitButton classname="w-full mt-4" isLoading={isLoading}>
                {dic.submit}
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

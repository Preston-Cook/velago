'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/hooks/useLocale';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useToast } from '@/hooks/useToast';
import { cleanPhone } from '@/lib/cleanPhone';
import { codeRegex } from '@/lib/codeRegex';
import formatPhone from '@/lib/formatPhone';
import { phoneRegex } from '@/lib/phoneRegex';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CodeInput } from './CodeInput';
import { GoogleLoginButton } from './GoogleLoginButton';
import { ResendCodeButton } from './ResendCodeButton';
import { TextField } from './TextField';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface PhoneSignUpFormProps {
  dic: {
    title: string;
    description: string;
    labels: string[];
    account: {
      existsEmail: {
        title: string;
        description: string;
      };
      existsPhone: {
        title: string;
        description: string;
      };
      generic: {
        title: string;
        description: string;
      };
    };
    code: {
      success: {
        title: string;
        description: string;
      };
      error: {
        title: string;
        description: string;
      };
      invalid: {
        title: string;
        description: string;
      };
    };
    phone: {
      verify: string;
    };
    signup: {
      standard: string;
      google: string;
    };
    accountExists: {
      text: string;
      link: string;
    };
    button: {
      text: string;
    };
  };
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
  };
}

export function PhoneSignUpForm({ dic, validation }: PhoneSignUpFormProps) {
  const sbBrowserClient = createSbBrowserClient();
  const router = useRouter();
  const { locale } = useLocale();
  const { getQueryParam, deleteQueryParam } = useQueryParams();
  const { showToastError, showToastSuccess } = useToast();
  const error = getQueryParam('error');

  useEffect(() => {
    if (!error) return;

    const title =
      error === '409'
        ? dic.account.existsEmail.title
        : dic.account.generic.title;
    const description =
      error === '409'
        ? dic.account.existsEmail.description
        : dic.account.generic.description;

    showToastError({ title, description });
    deleteQueryParam('error');
  }, [error, deleteQueryParam, showToastError, dic]);

  const [isLoading, setIsLoading] = useState({
    isLoadingCode: false,
    isLoadingSignUp: false,
  });

  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const phoneSignUpFormSchema = useMemo(
    () =>
      z.object({
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
        email: z.union([z.string().email().nullish(), z.literal('')], {
          message: validation.email.email,
        }),
        code: z.string(),
      }),
    [validation],
  );

  const form = useForm<z.infer<typeof phoneSignUpFormSchema>>({
    resolver: zodResolver(phoneSignUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      code: '',
    },
  });

  const { control, getValues, setValue, handleSubmit: handleSubmitHook } = form;

  const handleCodeChange = useCallback(
    (e: string) => {
      setValue('code', e);
    },
    [setValue],
  );

  const handleSendCode = useCallback(async () => {
    const phone = cleanPhone(getValues('phone'));

    setIsLoading((prev) => ({ ...prev, isLoadingCode: true }));

    const { data, error: err1 } = await sbBrowserClient
      .from('user')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();

    if (err1) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError();
      return;
    }

    if (data) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError({
        title: dic.account.existsPhone.title,
        description: dic.account.existsPhone.description,
      });
      return;
    }

    const { error: err2 } = await sbBrowserClient.auth.signInWithOtp({ phone });

    setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));

    if (err2) {
      showToastError();
      return;
    }

    showToastSuccess({
      title: dic.code.success.title,
      description: dic.code.success.description,
    });

    setShowSignUp(true);
  }, [getValues, sbBrowserClient, dic, showToastError, showToastSuccess]);

  const handleSubmit = useCallback(
    async (values: z.infer<typeof phoneSignUpFormSchema>) => {
      setIsLoading((prev) => ({ ...prev, isLoadingSignUp: true }));

      const { firstName, lastName, phone, email, code } = values;

      const { data, error: err1 } = await sbBrowserClient
        .from('user')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (err1) {
        setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
        showToastError();
        return;
      }

      if (data) {
        setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
        showToastError({
          title: dic.account.existsEmail.title,
          description: dic.account.existsEmail.description,
        });
        return;
      }

      const cleanedPhone = cleanPhone(phone);

      const { data: data1, error: err3 } = await sbBrowserClient.auth.verifyOtp(
        {
          phone: cleanedPhone,
          token: code,
          type: 'sms',
        },
      );

      if (err3?.status === 403) {
        setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
        showToastError({
          title: dic.code.invalid.title,
          description: dic.code.invalid.description,
        });
        return;
      }

      if (err3) {
        setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
        showToastError();
        return;
      }

      const id = data1.user?.id as string;

      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          id,
          email,
          phone: cleanedPhone,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!res.ok) {
        await sbBrowserClient.auth.signOut();
        setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
        showToastError();
        return;
      }

      router.push(`/${locale}/map`);
      router.refresh();
    },
    [router, locale, sbBrowserClient, dic, showToastError, showToastSuccess],
  );

  const nameIsNotNull = useCallback(() => {
    const { firstName, lastName } = getValues();
    return firstName.length > 0 && lastName.length > 0;
  }, [getValues]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <>
                <FormItem
                  className="grid gap-2"
                  onChange={(e) => {
                    const { target } = e;

                    // @ts-expect-error value prop exists
                    const { value }: { value: string } = target;
                    setValue('phone', formatPhone(value));

                    if (value.replace(/[^0-9]/g, '').length > 10) return;

                    setShowSignUp((prev) => !prev);
                  }}
                >
                  <FormLabel>{dic.labels[2]}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'(123)-456-7890'}
                      {...field}
                      className="block w-full bg-secondary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {!showSignUp && (
                  <Button
                    disabled={
                      isLoading.isLoadingCode || !phoneRegex.test(field.value)
                    }
                    className="mt-2 w-full text-white"
                    type="button"
                    onClick={handleSendCode}
                  >
                    {isLoading.isLoadingCode ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      dic.phone.verify
                    )}
                  </Button>
                )}
              </>
            )}
          />
          {showSignUp && (
            <>
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{'Code'}</FormLabel>
                      <FormControl>
                        <div className="flex justify-between">
                          <CodeInput onChange={handleCodeChange} />
                          <ResendCodeButton
                            phone={getValues('phone')}
                            text="Resend"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button
                      type="submit"
                      disabled={
                        isLoading.isLoadingSignUp ||
                        !codeRegex.test(field.value) ||
                        !nameIsNotNull()
                      }
                      className="text-white"
                    >
                      {isLoading.isLoadingSignUp ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        dic.button.text
                      )}
                    </Button>
                  </>
                )}
              />
            </>
          )}
          <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary" />
          <GoogleLoginButton action="signUp" text={'Sign Up with Google'} />
        </div>
      </form>
    </Form>
  );
}

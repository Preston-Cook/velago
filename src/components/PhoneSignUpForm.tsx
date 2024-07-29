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
import { phoneRegex } from '@/lib/phoneRegex';
import { Input } from '@/components/ui/input';
import formatPhone from '@/lib/formatPhone';
import { Loader2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { GoogleLoginButton } from './GoogleLoginButton';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { useEffect, useState } from 'react';
import { cleanPhone } from '@/lib/cleanPhone';
import { ResendCodeButton } from './ResendCodeButton';
import { CodeInput } from './CodeInput';
import { codeRegex } from '@/lib/codeRegex';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useToast } from '@/hooks/useToast';

interface PhoneSignUpFormProps {
  dic: {
    labels: string[];
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

  useEffect(
    function () {
      let timeout = null;

      if (!error) return;

      const title =
        error === '409'
          ? 'Uh oh! Account already exists'
          : 'Uh oh! Something went wrong';
      const description =
        error === '409'
          ? 'There is already an account associated with this email'
          : 'There was a problem with your request';

      timeout = setTimeout(() => {
        showToastError({ title, description });
      }, 0);

      deleteQueryParam('error');

      return () => timeout && clearTimeout(timeout);
    },
    [deleteQueryParam, error, showToastError],
  );

  const [{ isLoadingCode, isLoadingSignUp }, setIsLoading] = useState({
    isLoadingCode: false,
    isLoadingSignUp: false,
  });

  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const phoneSignUpFormSchema = z.object({
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
  });

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

  function handleCodeChange(e: string) {
    setValue('code', e);
  }

  const { control, getValues, setValue, handleSubmit: handleSubmitHook } = form;

  async function handleSendCode() {
    // send code but show loading while sending code. Then display on page
    const phone = cleanPhone(getValues('phone'));

    setIsLoading((prev) => ({ ...prev, isLoadingCode: true }));

    const { data, error: err1 } = await sbBrowserClient
      .from('user')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();

    console.log(err1);

    if (err1) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError();
      return;
    }

    if (data) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError({
        title: 'Uh oh! Account exists',
        description:
          'There is already an account associated with this phone number',
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
      title: 'Success!',
      description: 'Your code has been sent!',
    });

    setShowSignUp(true);
  }

  async function handleSubmit(values: z.infer<typeof phoneSignUpFormSchema>) {
    setIsLoading((prev) => ({ ...prev, isLoadingSignUp: true }));

    const { firstName, lastName, phone, email, code } = values;

    // check if user with email already exists
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
        title: 'Uh oh! Account already exists',
        description: 'There is already an account associated with this email',
      });
      return;
    }

    // add user to public users table and log them in
    const cleanedPhone = cleanPhone(phone);

    const { data: data1, error: err3 } = await sbBrowserClient.auth.verifyOtp({
      phone: cleanedPhone,
      token: code,
      type: 'sms',
    });

    if (err3?.status === 403) {
      setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
      showToastError({
        title: 'Invalid Code',
        description: 'Your code is invalid',
      });
      return;
    }

    if (err3) {
      setIsLoading((prev) => ({ ...prev, isLoadingSignUp: false }));
      showToastError();
      return;
    }

    const id = data1.user?.id as string;

    // post data to api
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
  }

  function nameIsNotNull() {
    const { firstName, lastName } = getValues();

    return firstName.length > 0 && lastName.length > 0;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name={'firstName'}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>{'First Name'}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Aaron'}
                        {...field}
                        className="block w-full bg-secondary"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={control}
              name={'lastName'}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>{'Last Name'}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Swartz'}
                        {...field}
                        className="block w-full bg-secondary"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <FormField
            control={control}
            name={'email'}
            render={({ field }) => (
              <>
                <FormItem className="grid gap-2">
                  <FormLabel>{`${dic.labels[3]} (Optional)`}</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input
                      placeholder={'example@velago.com'}
                      {...field}
                      className="block w-full bg-secondary"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
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

                    setShowSignUp((prev) => (prev ? !prev : prev));
                  }}
                >
                  <FormLabel>{'Phone'}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'(123)-456-7890'}
                      {...field}
                      className="block w-full bg-secondary"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {!showSignUp && (
                  <Button
                    disabled={isLoadingCode || !phoneRegex.test(field.value)}
                    className="mt-2 w-full text-white"
                    type="button"
                    onClick={handleSendCode}
                  >
                    {isLoadingCode ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Verify Phone'
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
                        isLoadingSignUp ||
                        !codeRegex.test(field.value) ||
                        !nameIsNotNull()
                      }
                      className="text-white"
                    >
                      {isLoadingSignUp ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Sign Up'
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

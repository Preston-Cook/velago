'use client';

import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { GoogleLoginButton } from './GoogleLoginButton';
import { useState } from 'react';
import { z } from 'zod';
import { phoneRegex } from '@/lib/phoneRegex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import formatPhone from '@/lib/formatPhone';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import { CodeInput } from './CodeInput';
import { ResendCodeButton } from './ResendCodeButton';
import { cleanPhone } from '@/lib/cleanPhone';
import { codeRegex } from '@/lib/codeRegex';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { useEffect } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useToast } from '@/hooks/useToast';

interface PhoneLoginFormProps {
  validation: {
    phone: {
      refine: string;
    };
    otp: {
      refine: string;
    };
  };
  dic: {
    title: string;
    description: string;
    labels: string[];
    login: {
      standard: string;
      google: string;
    };
    noAccount: {
      text: string;
      link: string;
    };
  };
}

export function PhoneSignInForm({ validation, dic }: PhoneLoginFormProps) {
  const sbBrowserClient = createSbBrowserClient();
  const router = useRouter();
  const { locale } = useLocale();
  const { getQueryParam, deleteQueryParam } = useQueryParams();
  const error = getQueryParam('error');
  const { showToastError, showToastSuccess } = useToast();

  useEffect(
    function () {
      let timeout = null;

      if (!error) return;

      const title =
        error === '404'
          ? 'Uh oh! Account does not exist'
          : 'Uh oh! Something went wrong';
      const description =
        error === '404'
          ? 'There is no account with this email'
          : 'There was a problem with your request';

      timeout = setTimeout(() => {
        showToastSuccess({ title, description });
      }, 0);

      deleteQueryParam('error');

      return () => timeout && clearTimeout(timeout);
    },
    [deleteQueryParam, error, showToastSuccess],
  );

  const [{ isLoadingCode, isLoadingLogin }, setIsLoading] = useState({
    isLoadingCode: false,
    isLoadingLogin: false,
  });

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const userSignInFormSchema = z.object({
    phone: z.string().refine((value) => phoneRegex.test(value), {
      message: validation.phone.refine,
    }),
    code: z.string(),
  });

  const form = useForm<z.infer<typeof userSignInFormSchema>>({
    resolver: zodResolver(userSignInFormSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
  });

  const { handleSubmit: handleSubmitHook, getValues, setValue, control } = form;

  async function handleSubmit({
    phone,
    code,
  }: z.infer<typeof userSignInFormSchema>) {
    setIsLoading((prev) => ({ ...prev, isLoadingLogin: true }));

    const { error } = await sbBrowserClient.auth.verifyOtp({
      phone: cleanPhone(phone),
      token: code,
      type: 'sms',
    });

    if (error?.status === 403) {
      setIsLoading((prev) => ({ ...prev, isLoadingLogin: false }));
      showToastError({
        title: 'Invalid Code',
        description: 'Your code is invalid',
      });
      return;
    }

    if (error) {
      setIsLoading((prev) => ({ ...prev, isLoadingLogin: false }));
      showToastError();
      return;
    }

    router.push(`/${locale}/map`);
    router.refresh();
  }

  async function handleSendCode() {
    const phone = cleanPhone(getValues('phone'));

    setIsLoading((prev) => ({ ...prev, isLoadingCode: true }));

    // check if user exists. If not, show error
    const { data, error: err1 } = await sbBrowserClient
      .from('User')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (!data) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError({
        title: 'Uh oh! Account does not exist',
        description: 'There is no account with this phone number',
      });
      return;
    }

    if (err1) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError();
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

    setShowLogin(true);
  }

  function handleCodeChange(e: string) {
    setValue('code', e);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
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

                    // if the number of digits in the current value is >10 return
                    if (value.replace(/[^0-9]/g, '').length > 10) return;

                    setShowLogin((prev) => (prev ? !prev : prev));
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
                {!showLogin && (
                  <Button
                    disabled={isLoadingCode || !phoneRegex.test(field.value)}
                    className="mt-2 w-full text-white"
                    type="button"
                    onClick={handleSendCode}
                  >
                    {isLoadingCode ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send Code'
                    )}
                  </Button>
                )}
              </>
            )}
          />
          {showLogin && (
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
                      disabled={isLoadingLogin || !codeRegex.test(field.value)}
                      className="text-white"
                    >
                      {isLoadingLogin ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </>
                )}
              />
            </>
          )}
          <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary" />
          <GoogleLoginButton action="signIn" text={dic.login.google} />
        </div>
      </form>
    </Form>
  );
}

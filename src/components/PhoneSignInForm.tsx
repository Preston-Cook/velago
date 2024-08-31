'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLocale } from '@/hooks/useLocale';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useToast } from '@/hooks/useToast';
import { cleanPhone } from '@/lib/cleanPhone';
import { codeRegex } from '@/lib/codeRegex';
import formatPhone from '@/lib/formatPhone';
import { phoneRegex } from '@/lib/phoneRegex';
import { createSbBrowserClient } from '@/lib/sbBrowserClient';
import type { UserSignInDic } from '@/types/DicTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CodeInput } from './CodeInput';
import { GoogleLoginButton } from './GoogleLoginButton';
import { ResendCodeButton } from './ResendCodeButton';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface PhoneLoginFormProps {
  dic: UserSignInDic;
}

export function PhoneSignInForm({ dic }: PhoneLoginFormProps) {
  const sbBrowserClient = createSbBrowserClient();
  const router = useRouter();
  const { locale } = useLocale();
  const { getQueryParam, deleteQueryParam } = useQueryParams();
  const error = getQueryParam('error');
  const { showToastError, showToastSuccess } = useToast();
  const { validation } = dic;

  useEffect(() => {
    if (!error) return;

    const title =
      error === '404'
        ? dic.account.error.notFound.title
        : dic.account.error.generic.title;
    const description =
      error === '404'
        ? dic.account.error.notFound.description
        : dic.account.error.generic.description;

    showToastError({ title, description });
    deleteQueryParam('error');
  }, [deleteQueryParam, error, showToastError, dic]);

  const [isLoading, setIsLoading] = useState({
    isLoadingCode: false,
    isLoadingLogin: false,
  });

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const userSignInFormSchema = useMemo(
    () =>
      z.object({
        phone: z.string().refine((value) => phoneRegex.test(value), {
          message: validation.phone.refine,
        }),
        code: z.string(),
      }),
    [validation],
  );

  const form = useForm<z.infer<typeof userSignInFormSchema>>({
    resolver: zodResolver(userSignInFormSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
  });

  const { handleSubmit: handleSubmitHook, getValues, setValue, control } = form;

  const handleSubmit = useCallback(
    async ({ phone, code }: z.infer<typeof userSignInFormSchema>) => {
      setIsLoading((prev) => ({ ...prev, isLoadingLogin: true }));

      const { error } = await sbBrowserClient.auth.verifyOtp({
        phone: cleanPhone(phone),
        token: code,
        type: 'sms',
      });

      if (error?.status === 403) {
        setIsLoading((prev) => ({ ...prev, isLoadingLogin: false }));
        showToastError({
          title: dic.code.error.title,
          description: dic.code.error.description,
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
    },
    [dic, router, sbBrowserClient, showToastError, locale],
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

    if (!data) {
      setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));
      showToastError({
        title: dic.account.error.notFound.title,
        description: dic.account.error.notFound.description,
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

    setShowLogin(true);
  }, [dic, getValues, sbBrowserClient, showToastError, showToastSuccess]);

  const handleCodeChange = useCallback(
    (e: string) => {
      setValue('code', e);
    },
    [setValue],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <>
              <FormItem
                onChange={(e) => {
                  const { target } = e;

                  // @ts-expect-error value prop exists
                  const { value }: { value: string } = target;

                  setValue('phone', formatPhone(value));

                  if (value.replace(/[^0-9]/g, '').length > 10) return;

                  setShowLogin((prev) => (prev ? !prev : prev));
                }}
              >
                <FormLabel>{dic.phone.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'(123)-456-7890'}
                    {...field}
                    className="block w-full bg-secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              {!showLogin && (
                <Button
                  disabled={
                    isLoading.isLoadingCode || !phoneRegex.test(field.value)
                  }
                  className="mt-6 w-full text-white"
                  type="button"
                  onClick={handleSendCode}
                >
                  {isLoading.isLoadingCode ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    dic.code.button.sendCode
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
                          text={dic.code.button.resend}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Button
                    type="submit"
                    disabled={
                      isLoading.isLoadingLogin || !codeRegex.test(field.value)
                    }
                    className="text-white"
                  >
                    {isLoading.isLoadingLogin ? (
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
        <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary my-6" />
        <GoogleLoginButton action="signIn" text={dic.login.google} />
      </form>
    </Form>
  );
}

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
import { useToast } from './ui/use-toast';
import { CodeInput } from './CodeInput';
import { ResendCodeButton } from './ResendCodeButton';
import { cleanPhone } from '@/lib/cleanPhone';
import { codeRegex } from '@/lib/codeRegex';
import { Separator } from './ui/separator';

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

export default function UserSignInForm({
  validation,
  dic,
}: PhoneLoginFormProps) {
  const sbBrowserClient = createSbBrowserClient();

  const [{ isLoadingCode, isLoadingLogin }, setIsLoading] = useState({
    isLoadingCode: false,
    isLoadingLogin: false,
  });

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { toast } = useToast();

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

    const { data, error } = await sbBrowserClient.auth.verifyOtp({
      phone: cleanPhone(phone),
      token: code,
      type: 'sms',
    });

    setIsLoading((prev) => ({ ...prev, isLoadingLogin: false }));

    if (error?.status === 403) {
      toast({
        title: 'Invalid Code',
        description: 'Your code is invalid',
        variant: 'destructive',
      });
      return;
    }

    if (error) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
        variant: 'destructive',
      });
      return;
    }

    console.log(JSON.stringify(data));
    console.log(JSON.stringify(error));

    // TODO: Redirect user to some page
  }

  async function handleSendCode() {
    // send code but show loading while sending code. Then display on page
    const phone = cleanPhone(getValues('phone'));

    setIsLoading((prev) => ({ ...prev, isLoadingCode: true }));

    await sbBrowserClient.auth.signOut();
    const { error } = await sbBrowserClient.auth.signInWithOtp({ phone });

    setIsLoading((prev) => ({ ...prev, isLoadingCode: false }));

    // There is something wrong with sending code
    if (error) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'There was a problem with your request',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success!',
      description: 'Your code has been sent!',
      variant: 'default',
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          <GoogleLoginButton text={dic.login.google} />
        </div>
      </form>
    </Form>
  );
}

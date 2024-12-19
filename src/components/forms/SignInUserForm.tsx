'use client';

import { CodeInput } from '@/components/CodeInput';
import { ResendCodeButton } from '@/components/ResendCodeButton';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useRouter } from '@/i18n/routing';
import { createUserSignInSchema } from '@/schemas/userSignInFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react'; // Import startTransition
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { GoogleSignInButton } from '../GoogleSignInButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { PhoneInput } from '../ui/PhoneInput';
import { Separator } from '../ui/Separator';

export function SignInUserForm() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const [hasSentCode, setHasSentCode] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const signUpUserSchema = createUserSignInSchema(t);
  const router = useRouter();

  async function handleRequestOtp() {
    const isValid = await form.trigger(['phone']);
    if (!isValid) return;

    const phone = form.getValues('phone');
    setIsSubmittingRequest(true);

    try {
      const response = await signIn('otp', { phone, redirect: false });

      if (!response?.error) {
        toast.success(t('UserSignIn.toast.success.title'), {
          description: t('UserSignIn.toast.success.description'),
        });
        setHasSentCode(true);
      } else {
        throw new Error('OTP request failed');
      }
    } catch {
      toast.error(t('UserSignIn.toast.error.title'), {
        description: t('UserSignIn.toast.error.description'),
      });
    } finally {
      setIsSubmittingRequest(false);
    }
  }

  const form = useForm<z.infer<typeof signUpUserSchema>>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
    mode: 'onChange',
  });

  const codeValue = form.watch('code');

  useEffect(
    function () {
      async function handleCodeComplete() {
        const isValid = await form.trigger('code');
        if (!isValid) return;

        const { phone, code: otp } = form.getValues();

        const res = await signIn('otp', {
          phone,
          otp,
          redirect: false,
        });

        if (!res?.error) {
          router.push('/map');
        } else {
          toast.error(t('UserSignIn.toast.errorOtp.title'), {
            description: t('UserSignIn.toast.errorOtp.description'),
          });
        }
      }

      if (codeValue?.length === 6) {
        handleCodeComplete();
      }
    },
    [codeValue, form, t, router],
  );

  return (
    <Form {...form}>
      <form ref={formRef} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('UserSignIn.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    type="phone"
                    defaultCountry="US"
                    placeholder={t('UserSignIn.placeholders.phone')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Dialog
          onOpenChange={() =>
            setHasSentCode((prev) => (!hasSentCode ? false : !prev))
          }
          open={hasSentCode}
        >
          <DialogTrigger asChild>
            <Button disabled={isSubmittingRequest} onClick={handleRequestOtp}>
              {isSubmittingRequest ? <Spinner size={1} /> : 'Request Code'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] border-primary bg-secondary">
            <DialogHeader>
              <DialogTitle className="text-left">
                {t('UserSignIn.dialog.title')}
              </DialogTitle>
              <DialogDescription className="text-left">
                {t('UserSignIn.dialog.description')}
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full text-left">
                  <FormLabel className="text-left">
                    {t('UserSignIn.labels.code')}
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <CodeInput {...field} />
                      <ResendCodeButton phone={form.getValues('phone')} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogContent>
        </Dialog>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <GoogleSignInButton />
      </form>
    </Form>
  );
}

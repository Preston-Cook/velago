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
import { getCreatedSession } from '@/lib/getCreatedSession';
import { createUserSignInSchema } from '@/schemas/userSignInFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react'; // Import startTransition
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
  const [hasSentCode, setHasSentCode] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const router = useRouter();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const signUpUserSchema = createUserSignInSchema(t);

  async function handleRequestOtp() {
    const isValid = await form.trigger(['phone']);
    if (!isValid) return;

    const phone = form.getValues('phone');
    setIsSubmittingRequest(true);

    try {
      const response = await signIn('otp', {
        phone,
        action: 'signin',
        redirect: false,
      });

      if (response?.code === '200') {
        toast.success(t('UserSignIn.toast.success.title'), {
          description: t('UserSignIn.toast.success.description'),
        });
        setHasSentCode(true);
      } else if (response?.code === '404') {
        toast.error('User does not exist', {
          description: 'There is no user with this phone number',
        });
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
          action: 'signin',
          redirect: false,
        });

        if (!res?.error) {
          const session = await getCreatedSession();

          if (!session) {
            throw new Error('Unable to fetch session');
          }

          const locale = session?.user.locale as string;

          // no need to check for default redirect because this login is always for standard users
          router.replace('/map', { locale });
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
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('UserSignIn.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={isSubmittingRequest || isLoadingGoogle}
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
            <Button
              disabled={isSubmittingRequest || isLoadingGoogle}
              onClick={handleRequestOtp}
            >
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
                      <CodeInput
                        disabled={isLoadingGoogle || isSubmittingRequest}
                        {...field}
                      />
                      <ResendCodeButton
                        disabled={isLoadingGoogle || isSubmittingRequest}
                        phone={form.getValues('phone')}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogContent>
        </Dialog>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <GoogleSignInButton
          disabled={isSubmittingRequest}
          setIsLoading={setIsLoadingGoogle}
          isLoading={isLoadingGoogle}
        />
      </form>
    </Form>
  );
}

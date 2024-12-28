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
import { createSignUpUserSchema } from '@/schemas/userSignUpFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react'; // Import startTransition
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { GoogleSignUpButton } from '../GoogleSignUpButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Input } from '../ui/Input';
import { PhoneInput } from '../ui/PhoneInput';
import { Separator } from '../ui/Separator';

export function SignUpUserForm() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const [hasSentCode, setHasSentCode] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const router = useRouter();

  const signUpUserSchema = createSignUpUserSchema(t);

  async function handleRequestOtp() {
    const isValid = await form.trigger([
      'phone',
      'firstName',
      'lastName',
      'email',
    ]);

    if (!isValid) {
      return;
    }

    const phone = form.getValues('phone');
    const email = form.getValues('email');

    setIsSubmittingRequest(true);

    try {
      const response = await signIn('otp', {
        email,
        phone,
        action: 'signup',
        redirect: false,
      });

      if (response?.code === '200') {
        toast.success(t('UserSignIn.toast.success.title'), {
          description: t('UserSignIn.toast.success.description'),
        });
        setHasSentCode(true);
      } else if (response?.code === '409') {
        toast.error('User already exists', {
          description: 'A user already exists with this email or phone number',
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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      code: '',
    },
    mode: 'onChange',
  });

  const codeValue = form.watch('code');

  useEffect(() => {
    if (codeValue?.length === 6) {
      handleCodeComplete();
    }

    async function handleCodeComplete() {
      const isValid = await form.trigger('code');

      if (!isValid) {
        return;
      }

      const { firstName, lastName, email, phone, code: otp } = form.getValues();

      const res = await signIn('otp', {
        firstName,
        lastName,
        email,
        phone,
        otp,
        action: 'signup',
        redirect: false,
      });

      if (!res?.error) {
        router.push('/map');
      } else {
        toast.error(t('UserSignUp.toast.errorOtp.title'), {
          description: t('UserSignUp.toast.errorOtp.description'),
        });
      }
    }
  }, [codeValue, form, t, router]);

  return (
    <Form {...form}>
      <form ref={formRef} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t('UserSignUp.labels.firstName')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmittingRequest || isLoadingGoogle}
                      className="bg-secondary"
                      placeholder={t('UserSignUp.placeholders.firstName')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t('UserSignUp.labels.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmittingRequest || isLoadingGoogle}
                      className="bg-secondary"
                      placeholder={t('UserSignUp.placeholders.lastName')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{'Email (Optional)'}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmittingRequest || isLoadingGoogle}
                    className="bg-secondary"
                    placeholder={t('UserSignUp.placeholders.email')}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('UserSignUp.labels.phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={isSubmittingRequest || isLoadingGoogle}
                    type="phone"
                    defaultCountry="US"
                    placeholder={t('UserSignUp.placeholders.phone')}
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
          <DialogContent className="max-w-[425px] border border-primary bg-secondary">
            <DialogHeader>
              <DialogTitle className="text-left">
                {t('UserSignUp.dialog.title')}
              </DialogTitle>
              <DialogDescription className="text-left">
                {t('UserSignUp.dialog.description')}
              </DialogDescription>
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <FormLabel className="text-left">
                      {t('UserSignUp.labels.code')}
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between">
                        <CodeInput
                          disabled={isSubmittingRequest || isLoadingGoogle}
                          {...field}
                        />
                        <ResendCodeButton
                          disabled={isSubmittingRequest || isLoadingGoogle}
                          email={form.getValues('email')}
                          phone={form.getValues('phone')}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
          </DialogContent>
        </Dialog>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <GoogleSignUpButton
          isLoading={isLoadingGoogle}
          setIsLoading={setIsLoadingGoogle}
        />
      </form>
    </Form>
  );
}

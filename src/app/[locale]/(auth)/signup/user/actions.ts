'use server';

import { signIn } from '@/config/auth';
import { getPathname } from '@/i18n/routing';
import { phoneRegex } from '@/lib/regex';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { getLocale } from 'next-intl/server';

interface RequestOtpParams {
  phone: string;
}

export async function requestOtp({ phone }: RequestOtpParams) {
  if (!isValidPhoneNumber(phone) || !phoneRegex.test(phone)) {
    return { message: 'error' };
  }

  await signIn('otp', { phone, redirect: false });
  return { message: 'success' };
}

interface VerifyOtpParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone: string;
  otp: string;
}

export async function verifyOtp(params: VerifyOtpParams) {
  const locale = await getLocale();
  const localizedRedirectUrl = getPathname({ href: '/map', locale });

  await signIn('otp', {
    ...params,
    redirect: true,
    redirectTo: localizedRedirectUrl,
  });
}

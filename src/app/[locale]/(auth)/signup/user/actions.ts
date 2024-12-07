'use server';

import { signIn } from '@/config/auth';
import { phoneRegex } from '@/lib/regex';
import { isValidPhoneNumber } from 'libphonenumber-js';

export async function requestOtp(phone: string) {
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
  await signIn('otp', { ...params, redirect: true, redirectTo: '/map' });
}

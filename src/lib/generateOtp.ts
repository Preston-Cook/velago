import { OTP_LENGTH } from '@/config/auth';

export function generateOtp(n: number = OTP_LENGTH): string {
  const characters = '0123456789';
  let otp = '';

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
}

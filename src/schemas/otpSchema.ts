import { phoneRegex } from '@/lib/regex';
import { z } from 'zod';

export const otpSchema = z.object({
  phone: z.string().refine((value) => phoneRegex.test(value)),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.union([z.string().email(), z.literal('')]).optional(),
  otp: z.string().optional(),
});

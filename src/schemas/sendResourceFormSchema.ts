import { phoneRegex } from '@/lib/regex';
import { Translator } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export function createSendResourceSchema(t: Translator) {
  return z.object({
    phone: z
      .string({ message: t('Validation.sendResourceSchema.phone.required') })
      .refine(
        (value) => isValidPhoneNumber(value, 'US') && phoneRegex.test(value),
        { message: t('Validation.userSignInFormSchema.phone.invalid') },
      ),
  });
}

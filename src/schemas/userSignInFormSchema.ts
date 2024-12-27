import { codeRegex, phoneRegex } from '@/config/regex';
import { Translator } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export function createUserSignInSchema(t: Translator) {
  return z.object({
    phone: z
      .string({ message: t('Validation.userSignInFormSchema.phone.required') })
      .refine(
        (value) => isValidPhoneNumber(value, 'US') && phoneRegex.test(value),
        { message: t('Validation.userSignInFormSchema.phone.invalid') },
      ),
    code: z
      .string({ message: t('Validation.userSignInFormSchema.code.required') })
      .refine((value) => codeRegex.test(value), {
        message: t('Validation.userSignInFormSchema.code.invalid'),
      }),
  });
}

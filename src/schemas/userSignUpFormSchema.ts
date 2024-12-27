import { codeRegex, phoneRegex } from '@/config/regex';
import { Translator } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export function createSignUpUserSchema(t: Translator) {
  return z.object({
    firstName: z
      .string({
        message: t('Validation.userSignUpFormSchema.firstName.required'),
      })
      .min(2, {
        message: t('Validation.userSignUpFormSchema.firstName.minLength'),
      })
      .max(50, {
        message: t('Validation.userSignUpFormSchema.firstName.maxLength'),
      }),
    lastName: z
      .string({
        message: t('Validation.userSignUpFormSchema.lastName.required'),
      })
      .min(2, {
        message: t('Validation.userSignUpFormSchema.lastName.minLength'),
      })
      .max(50, {
        message: t('Validation.userSignUpFormSchema.lastName.maxLength'),
      }),
    email: z
      .union([
        z.string().email({
          message: t('Validation.userSignUpFormSchema.email.invalid'),
        }),
        z.literal(''),
      ])
      .optional(),
    phone: z
      .string({ message: t('Validation.userSignUpFormSchema.phone.required') })
      .refine(
        (value) => isValidPhoneNumber(value, 'US') && phoneRegex.test(value),
        { message: t('Validation.userSignUpFormSchema.phone.invalid') },
      ),
    code: z
      .string({ message: t('Validation.userSignUpFormSchema.code.required') })
      .refine((value) => codeRegex.test(value), {
        message: t('Validation.userSignUpFormSchema.code.invalid'),
      }),
  });
}

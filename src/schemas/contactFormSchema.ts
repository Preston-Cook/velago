import { phoneRegex } from '@/config/regex';
import { Translator } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export function createContactFormSchema(t: Translator) {
  return z.object({
    firstName: z
      .string({
        message: t('Validation.contactFormSchema.firstName.required'),
      })
      .min(1, { message: t('Validation.contactFormSchema.firstName.required') })
      .min(2, {
        message: t('Validation.contactFormSchema.firstName.minLength'),
      })
      .max(50, {
        message: t('Validation.contactFormSchema.firstName.maxLength'),
      }),
    lastName: z
      .string({
        message: t('Validation.contactFormSchema.lastName.required'),
      })
      .min(1, {
        message: t('Validation.contactFormSchema.lastName.required'),
      })
      .min(2, {
        message: t('Validation.contactFormSchema.lastName.minLength'),
      })
      .max(50, {
        message: t('Validation.contactFormSchema.lastName.maxLength'),
      }),
    phone: z
      .string({
        message: t('Validation.contactFormSchema.phone.required'),
      })
      .min(1, {
        message: t('Validation.contactFormSchema.phone.required'),
      })
      .refine(
        (value) => {
          return isValidPhoneNumber(value, 'US') && phoneRegex.test(value);
        },
        {
          message: t('Validation.contactFormSchema.phone.invalid'),
        },
      ),
    email: z
      .string({
        message: t('Validation.contactFormSchema.email.required'),
      })
      .min(1, {
        message: t('Validation.contactFormSchema.email.required'),
      })
      .email({
        message: t('Validation.contactFormSchema.email.invalid'),
      }),
    message: z
      .string({
        message: t('Validation.contactFormSchema.message.required'),
      })
      .min(1, {
        message: t('Validation.contactFormSchema.message.required'),
      })
      .min(10, {
        message: t('Validation.contactFormSchema.message.minLength'),
      })
      .max(300, {
        message: t('Validation.contactFormSchema.message.maxLength'),
      }),
  });
}

import { phoneRegex } from '@/config/regex';
import { Translator } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export function createOrganizationSignUpSchema(t: Translator) {
  return z.object({
    firstName: z
      .string({
        message: t('Validation.organizationSignUpSchema.firstName.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignUpSchema.firstName.required'),
      })
      .min(2, {
        message: t('Validation.organizationSignUpSchema.firstName.minLength'),
      })
      .max(50, {
        message: t('Validation.organizationSignUpSchema.firstName.maxLength'),
      }),
    lastName: z
      .string({
        message: t('Validation.organizationSignUpSchema.lastName.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignUpSchema.lastName.required'),
      })
      .min(2, {
        message: t('Validation.organizationSignUpSchema.lastName.minLength'),
      })
      .max(50, {
        message: t('Validation.organizationSignUpSchema.lastName.maxLength'),
      }),
    phone: z
      .string({
        message: t('Validation.organizationSignUpSchema.phone.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignUpSchema.phone.required'),
      })
      .refine(
        (value) => {
          return isValidPhoneNumber(value, 'US') && phoneRegex.test(value);
        },
        {
          message: t('Validation.organizationSignUpSchema.phone.invalid'),
        },
      ),
    email: z
      .string({
        message: t('Validation.organizationSignUpSchema.email.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignUpSchema.email.required'),
      })
      .email({
        message: t('Validation.organizationSignUpSchema.email.invalid'),
      }),
    message: z
      .string({
        message: t('Validation.organizationSignUpSchema.message.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignUpSchema.message.required'),
      })
      .min(10, {
        message: t('Validation.organizationSignUpSchema.message.minLength'),
      })
      .max(300, {
        message: t('Validation.organizationSignUpSchema.message.maxLength'),
      }),
  });
}

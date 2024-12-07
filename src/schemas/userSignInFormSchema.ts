import { phoneRegex } from '@/lib/regex';
import { Translator } from '@/types';
import { z } from 'zod';

// export function createContactFormSchema(t: Translator) {
//   return z.object({
//     firstName: z
//       .string({
//         message: t('Validation.contactFormSchema.firstName.required'),
//       })
//       .min(2, {
//         message: t('Validation.contactFormSchema.firstName.minLength'),
//       })
//       .max(50, {
//         message: t('Validation.contactFormSchema.firstName.maxLength'),
//       }),
//     lastName: z
//       .string({
//         message: t('Validation.contactFormSchema.lastName.required'),
//       })
//       .min(2, {
//         message: t('Validation.contactFormSchema.lastName.minLength'),
//       })
//       .max(50, {
//         message: t('Validation.contactFormSchema.lastName.maxLength'),
//       }),
//     phone: z
//       .string({
//         message: t('Validation.contactFormSchema.phone.required'),
//       })
//       .refine(
//         (value) => {
//           return isValidPhoneNumber(value, 'US');
//         },
//         {
//           message: t('Validation.contactFormSchema.phone.invalid'),
//         },
//       ),
//     email: z
//       .string({
//         message: t('Validation.contactFormSchema.email.required'),
//       })
//       .email({
//         message: t('Validation.contactFormSchema.email.invalid'),
//       }),
//     message: z
//       .string({
//         message: t('Validation.contactFormSchema.message.required'),
//       })
//       .min(10, {
//         message: t('Validation.contactFormSchema.message.minLength'),
//       })
//       .max(300, {
//         message: t('Validation.contactFormSchema.message.maxLength'),
//       }),
//   });
// }

export function createSignUpUserSchema(t: Translator) {
  return z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string().refine((value) => phoneRegex.test(value)),
    code: z.string(),
  });
}

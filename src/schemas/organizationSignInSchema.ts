import { Translator } from '@/types';
import { z } from 'zod';

export function createOrganizationSignInSchema(t: Translator) {
  return z.object({
    email: z
      .string({
        message: t('Validation.organizationSignInSchema.email.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignInSchema.email.required'),
      })
      .email({
        message: t('Validation.organizationSignInSchema.email.invalid'),
      }),
    password: z
      .string({
        message: t('Validation.organizationSignInSchema.password.required'),
      })
      .min(1, {
        message: t('Validation.organizationSignInSchema.password.required'),
      }),
  });
}

export const organizationSignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
  action: z.enum(['signin', 'signup']),
});

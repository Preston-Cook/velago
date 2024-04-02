import { z } from 'zod';

const phoneRegExp = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

export default z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Must be at least 2 characters',
    })
    .max(50, {
      message: 'Must be at most 50 characters',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Must be at least 2 characters',
    })
    .max(50, {
      message: 'Must be at most 50 characters',
    }),
  phone: z.string().refine((value) => phoneRegExp.test(value), {
    message: 'Invalid phone number',
  }),
  email: z.string().email('Invalid email'),
  message: z
    .string()
    .min(10, {
      message: 'Must be at least 10 characters',
    })
    .max(300, {
      message: 'Must be at most 300 characters',
    }),
});

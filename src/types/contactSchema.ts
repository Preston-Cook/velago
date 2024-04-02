import contactSchema from '@/schemas/contactSchema';
import { z } from 'zod';

export type ContactSchema = z.infer<typeof contactSchema>;

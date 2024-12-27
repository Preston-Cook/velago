'use server';
import { prisma } from '@/config/prisma';
import { resendClient } from '@/config/resendClient';
import { createContactFormSchema } from '@/schemas/contactFormSchema';
import { getTranslations } from 'next-intl/server';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const APP_EMAIL = process.env.APP_EMAIL as string;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL as string;

export async function onSubmitAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const t = await getTranslations();
  const contactFormSchema = createContactFormSchema(t);

  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  // create contact message in db
  await prisma.contactMessage.create({
    data: parsed.data,
  });

  console.log(APP_EMAIL, CONTACT_EMAIL);

  const { firstName, lastName, message, phone, email } = parsed.data;

  // send email to velago
  const { error } = await resendClient.emails.send({
    from: APP_EMAIL,
    to: CONTACT_EMAIL,
    subject: `Contact Message - ${firstName} ${lastName}`,
    text: `
Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Message: ${message}
`,
  });

  if (error) {
    return { message: 'something went wrong' };
  }

  return { message: 'success' };
}

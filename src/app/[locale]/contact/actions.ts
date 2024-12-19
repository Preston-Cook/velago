'use server';
import { writePrisma } from '@/config/prismaWriteClient';
import { createContactFormSchema } from '@/schemas/contactFormSchema';
import { getTranslations } from 'next-intl/server';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

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
  await writePrisma.contactMessages.create({
    data: parsed.data,
  });

  // send email to velago
  // await resendClient.emails.send({
  //   from: process.env.VELAGO_APP_EMAIL as string,
  //   to: 'velagomail@gmail.com',
  //   subject: 'Hello',
  //   text: 'asdfasdf',
  // });

  return { message: 'success' };
}

import ContactTemplate from '@/emails/ContactTemplate';
import { ContactSchema } from '@/types/contactSchema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

async function sendEmail(
  from: string,
  to: string,
  subject: string,
  react: JSX.Element,
) {
  await resend.emails.send({
    from,
    to,
    subject,
    react,
  });
}

export async function sendContact(obj: ContactSchema) {
  const { firstName, lastName } = obj;

  await sendEmail(
    process.env.APP_EMAIL as string,
    process.env.CONTACT_EMAIL as string,
    `Contact Message: ${firstName} ${lastName}`,
    ContactTemplate(obj),
  );
}

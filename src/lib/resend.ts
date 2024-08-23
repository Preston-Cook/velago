import ContactEmailTemplate from '@/emails/ContactTemplate';
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
    from: 'Velago <info@velago.org>',
    to: 'preston.l.cook@gmail.com',
    subject,
    react,
  });
}

export async function sendContactEmail(obj: ContactSchema) {
  const { firstName, lastName, email } = obj;

  await sendEmail(
    process.env.APP_EMAIL as string,
    email,
    `Contact Message: ${firstName} ${lastName}`,
    ContactEmailTemplate(obj),
  );
}

export async function sendUserSignUpEmail(obj: ContactSchema) {}

export async function sendOrgSignUpEmail(obj: ContactSchema) {}

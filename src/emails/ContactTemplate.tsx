import { ContactSchema } from '@/types/contactSchema';
import { Button, Html } from '@react-email/components';

interface ContactEmailTemplateProps extends ContactSchema {}

export function ContactEmailTemplate({
  email,
  firstName,
  lastName,
  message,
  phone,
}: ContactEmailTemplateProps) {
  return (
    <Html lang="en">
      <Button>Test</Button>
    </Html>
  );
}

export default ContactEmailTemplate;

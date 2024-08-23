import * as React from 'react';
import { Html, Button } from '@react-email/components';
import { ContactSchema } from '@/types/contactSchema';

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

import { Html, Tailwind, Font } from '@react-email/components';
import * as React from 'react';
import config from '../../tailwind.config';

interface ContactTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactTemplate({
  firstName,
  lastName,
  email,
  phone,
  message,
}: ContactTemplateProps) {
  return (
    <Tailwind config={config}>
      <Html lang="en" className="bg-secondary">
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
            format: 'embedded-opentype',
          }}
        />
        <h1 className="font-base">
          {firstName}
          <br />
          {lastName}
          <br />
          {email}
          <br />
          {phone}
          <br />
          {message}
        </h1>
      </Html>
    </Tailwind>
  );
}

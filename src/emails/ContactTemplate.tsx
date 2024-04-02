interface ContactTemplateProps {
  message: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export default function ContactTemplate({
  firstName,
  lastName,
  phone,
  email,
  message,
}: ContactTemplateProps) {
  console.log(firstName, lastName, phone, email, message);

  return <h1>Hello, world!</h1>;
}

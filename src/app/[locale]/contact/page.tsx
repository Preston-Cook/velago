import { ContactForm } from '@/components/forms/ContactForm';

export default async function SignUpUser() {
  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="gap- flex flex-col gap-4 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
        <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
          Contact Us
        </h1>
        <p className="text-center">
          Get in touch with us to learn more about our services, partnerships,
          or any inquiries you may have.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}

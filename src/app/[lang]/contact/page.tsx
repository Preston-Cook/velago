import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <section className="my-8">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="px-4 mx-auto max-w-screen-sm text-center lg:px-6 mb-8 lg:mb-16">
          <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
            Contact Us
          </h1>
          <p className="font-light sm:text-xl">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div className="mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

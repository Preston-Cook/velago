import ContactForm from '@/components/ContactForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface ContactPageProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: ContactPageProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);
  const { title, description } = dic.pages.contact;
  const {
    validation: { contactFormSchema },
  } = dic;

  return (
    <section className="my-8 flex">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm px-4 text-center lg:mb-16 lg:px-6">
          <h1 className="mb-12 text-4xl font-bold leading-none tracking-tight text-primary md:text-5xl lg:text-5xl">
            {title}
          </h1>
          <p className="font-light sm:text-xl">{description}</p>
        </div>
        <div className="mx-auto">
          <ContactForm validation={contactFormSchema} dic={dic.pages.contact} />
        </div>
      </div>
    </section>
  );
}

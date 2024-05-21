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
    validation: { contactSchema },
  } = dic;

  return (
    <section className="my-8 flex">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="px-4 mx-auto max-w-screen-sm text-center lg:px-6 mb-8 lg:mb-16">
          <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
            {title}
          </h1>
          <p className="font-light sm:text-xl">{description}</p>
        </div>
        <div className="mx-auto">
          <ContactForm validation={contactSchema} dic={dic.pages.contact} />
        </div>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqSection() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-screen-xl py-8">
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl font-bold text-center text-primary">
          Frequently Asked Questions (FAQ)
        </h2>
        <Accordion
          type="single"
          collapsible
          className="bg-secondary p-4 rounded-md border"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm md:text-base">
              How can I find healthcare providers or charities near me?
            </AccordionTrigger>
            <AccordionContent>
              You can use our search bar to enter your location and discover
              nearby healthcare providers accepting Medicare and charitable
              organizations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm md:text-base">
              What types of services do healthcare providers and charities
              offer?
            </AccordionTrigger>
            <AccordionContent>
              Healthcare providers offer a range of medical services, including
              primary care, specialist consultations, and preventive screenings.
              Charitable organizations may provide financial assistance, food
              distribution, shelter, and other support services.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm md:text-base">
              How do I know if a healthcare provider accepts Medicare?
            </AccordionTrigger>
            <AccordionContent>
              Our platform filters healthcare providers based on their
              acceptance of Medicare. You can easily identify Medicare-accepting
              providers in your search results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-sm md:text-base">
              Can I search for specific types of resources?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can refine your search by specifying the type of
              healthcare provider (e.g., clinics, hospitals, pharmacies) or the
              focus area of charitable organizations (e.g., healthcare,
              education, housing).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-sm md:text-base">
              Are there any eligibility criteria for accessing charitable
              services?
            </AccordionTrigger>
            <AccordionContent>
              Eligibility criteria for charitable services vary by organization.
              Some may have income-based criteria, while others prioritize
              specific demographics or conditions. You can contact the
              organizations directly for more information.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

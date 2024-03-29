import PartnerCard from './PartnerCard';

const description1 =
  'Partner with us to reach more patients in need. Showcase your services and contribute to improving healthcare accessibility. Explore partnership opportunities today!';
const description2 =
  'Join us in making a difference. List your services, share impact stories, and engage with a caring community. Start your partnership journey today!';

export default function Content() {
  return (
    <div className="mx-auto w-full py-8">
      <h2 className="mb-2 lg:mb-8 text-3xl lg:text-4xl font-bold text-center text-primary">
        Partner with Us
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-around mt-12 gap-8">
        <PartnerCard
          title="Healthcare Providers"
          description={description1}
          action="List Your Firm"
        />
        <PartnerCard
          title="Organizations"
          description={description2}
          action="List Your Charity"
        />
      </div>
    </div>
  );
}

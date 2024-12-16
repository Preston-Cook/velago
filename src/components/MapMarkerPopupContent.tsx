import { serviceCategoryIconsLucide } from '@/config/misc';
import { formatAddress } from '@/lib/formatAddress';
import { CompleteService, Resource } from '@/types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  HelpingHand,
  MapPinned,
  Phone,
} from 'lucide-react';
import { v4 as uuid } from 'uuid';
import { Separator } from './ui/Separator';

interface MapMarkerPopupProps {
  resource: Resource;
  serviceAtLocationIdx: number;
  handleBackClick(): void;
  handleForwardClick(): void;
}

export function MapMarkerPopupContent({
  resource,
  serviceAtLocationIdx,
  handleBackClick,
  handleForwardClick,
}: MapMarkerPopupProps) {
  const { name, serviceAtLocation, phones, addresses, organization } = resource;

  const formattedPhones = phones.map(({ number: phoneNum }) =>
    parsePhoneNumberFromString(phoneNum, 'US')?.formatNational(),
  );

  const formattedAddresses = addresses.map((address) =>
    formatAddress({ address }),
  );

  const { service } = serviceAtLocation[serviceAtLocationIdx];
  const { category } = service as CompleteService;
  const CategoryIcon =
    serviceCategoryIconsLucide[
      category as keyof typeof serviceCategoryIconsLucide
    ];

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex items-center justify-center gap-4">
        <div className="w-6">
          <ArrowLeft
            onClick={handleBackClick}
            className={`cursor-pointer text-primary hover:text-primary/90 ${serviceAtLocationIdx === 0 && 'hidden'}`}
          />
        </div>
        <h3 className="flex-1 text-center text-lg text-white">{name}</h3>
        <div className="w-6">
          <ArrowRight
            onClick={handleForwardClick}
            className={`cursor-pointer text-primary hover:text-primary/90 ${serviceAtLocationIdx >= serviceAtLocation.length - 1 && 'hidden'}`}
          />
        </div>
      </div>
      <Separator className="bg-primary" />
      <section className="flex flex-col gap-4">
        <h3 className="clear-start flex items-center gap-4 font-medium">
          <HelpingHand /> Service Information
        </h3>
        <Separator className="bg-primary" />
        <div className="grid grid-cols-[35px,80px,1fr] items-start gap-x-2">
          <p className="self-center">
            <HeartHandshake size={15} />
          </p>
          <p className="self-center font-medium">Name:</p>
          <p className="self-center">{service?.name}</p>

          <p className="self-center">
            <CategoryIcon size={15} />
          </p>
          <p className="self-center font-medium">Category:</p>
          <p className="self-center">{category}</p>

          {phones.length > 0 && (
            <>
              <Phone size={15} className="self-center" />
              <p className="self-center font-medium">
                {phones.length === 1 ? 'Phone:' : 'Phones:'}
              </p>
              <p className="self-center">{formattedPhones.join(', ')}</p>
            </>
          )}
          {addresses.length > 0 && (
            <>
              <MapPinned size={15} className="self-center" />
              <p className="self-center font-medium">
                {formattedAddresses.length === 1 ? 'Address' : 'Addresses'}
              </p>
              <p>{formattedAddresses[0]}</p>
            </>
          )}
        </div>

        <div>
          <p className="font-medium">Description:</p>
          <p className="self-center">{service?.description}</p>
        </div>
        <div>
          <p className="font-medium">Required Documents:</p>
          {service && service?.requiredDocuments.length > 0 ? (
            <ul>
              {service?.requiredDocuments.map((doc) => (
                <li key={uuid()}>&#x2022; {doc.document}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      </section>
    </div>
  );
}

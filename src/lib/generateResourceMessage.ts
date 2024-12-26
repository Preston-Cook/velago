import { formatAddress } from '@/lib/formatAddress';
import { Resource } from '@/types';
import parsePhoneNumberFromString from 'libphonenumber-js';

interface GenerateResourceMessageParams {
  resourceData: Resource[];
}

export function generateResourceMessage({
  resourceData,
}: GenerateResourceMessageParams) {
  const messages = resourceData.map((resource) => {
    const {
      phones,
      serviceAtLocation,
      organization,
      addresses: unformattedAddresses,
    } = resource;

    const phone = parsePhoneNumberFromString(
      phones[0].number,
      'US',
    )?.formatInternational();
    const service = serviceAtLocation[0].service;
    const address = unformattedAddresses.map((unformattedAddress) =>
      formatAddress({ address: unformattedAddress }),
    );

    const requiredDocuments = service?.requiredDocuments.map(
      (el) => el.document,
    );

    return `Org Name: ${organization?.name}
Service Name: ${service?.name}
Service Category: ${service?.category}
Address: ${address}
Phone: ${phone}
Required Documents: ${requiredDocuments?.length === 0 ? 'None' : requiredDocuments?.join(', ')}
    `;
  });

  return messages.join('\n');
}

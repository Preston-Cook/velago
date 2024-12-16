import { Address } from '@prisma/client';

interface FormatAddressParams {
  address: Address;
}

export function formatAddress({ address }: FormatAddressParams) {
  const { address1, address2, attention, postalCode, stateProvince, city } =
    address;

  const formattedAddress = [
    attention ? `Attention: ${attention}` : null,
    address1,
    address2 || null,
    `${city}, ${stateProvince} ${postalCode}`,
  ]
    .filter(Boolean)
    .join(' ');

  return formattedAddress;
}

'use client';

import { HeartHandshake, HeartPulse } from 'lucide-react';
import { PartnerCard } from './PartnerCard';

export function Partner() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl md:text-4xl text-primary mx-auto">
        Partner With Us
      </h2>
      <div className="flex flex-col gap-8 lg:gap-16 sm:max-w-[90%] md:flex-row md:max-w-[80%] lg:max-w-[60%] mx-auto">
        <PartnerCard
          icon={HeartHandshake}
          title={'Healthcare Providers'}
          description={
            'Partner with us to reach more patients in need. Showcase your services and contribute to improving healthcare accessibility. Explore partnership opportunities today!'
          }
          name="medicalServices"
        />
        <PartnerCard
          name="charitableServices"
          icon={HeartPulse}
          title={'Healthcare Providers'}
          description={
            'Partner with us to reach more patients in need. Showcase your services and contribute to improving healthcare accessibility. Explore partnership opportunities today!'
          }
        />
      </div>
    </div>
  );
}

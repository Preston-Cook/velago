import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MedicalProviderFilters } from './MedicalProviderFilters';
import { Checkbox } from './ui/checkbox';

const resourceCategories = [
  'Aging/Disability',
  'Child Care/Education',
  'Criminal Justice',
  'Crisis/Emergency',
  'Employment',
  'Food/Nutrition',
  'Housing/Shelter',
  'Income/Expenses',
  'Legal Aid/Victims',
  'Mental Health',
  'Substance Use',
  'Veterans',
];

const ethnicityCategories = [
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'White or Caucasian',
  'Native American or Alaska Native',
  'Pacific Islander',
  'Multiracial',
  'Other',
];

const insuranceCategories = [
  'HMO (Health Maintenance Organization)',
  'PPO (Preferred Provider Organization)',
  'EPO (Exclusive Provider Organization)',
  'POS (Point of Service)',
  'HDHP (High Deductible Health Plan)',
  'Medicare',
  'Medicaid',
  "CHIP (Children's Health Insurance Program)",
  'Catastrophic Insurance',
  'FEHB (Federal Employees Health Benefits)',
  'TRICARE',
  'VA Health Care (Veterans Affairs)',
  'Short-Term Insurance',
  'DPC (Direct Primary Care)',
];

const providerCategories = [
  'Psychiatrist',
  'Psychologist',
  'Licensed Clinical Social Worker',
  'Licensed Chemical Dependency Specialist',
  'Licensed Professional Counselor',
];

const genderCategories = ['Female', 'Male', 'Other'];

interface FilterAccordionProps {
  isMapSidebar: boolean;
}

export function FilterAccordion({ isMapSidebar }: FilterAccordionProps) {
  const { getQueryParam, setQueryParam } = useQueryParams();

  // Memoize resource types and sets
  const resourceTypes = useMemo(
    () => getQueryParam('resource_types'),
    [getQueryParam],
  );

  const ethnicityTypes = getQueryParam('ethnicity_types');
  const insuranceTypes = getQueryParam('insurance_types');
  const providerTypes = getQueryParam('provider_types');
  const genderTypes = getQueryParam('gender_types');

  const resourceTypeSet = useMemo(
    () => new Set(resourceTypes?.split(',')),
    [resourceTypes],
  );

  // Manage active dropdown states
  const [activeDropdown, setActiveDropdown] = useState<
    'medical' | 'nonMedical' | null
  >(null);

  useEffect(() => {
    if (resourceTypes === null) {
      setQueryParam('resource_types', resourceCategories.join(','));
    }
    if (ethnicityTypes === null) {
      setQueryParam('ethnicity_types', ethnicityCategories.join(','));
    }

    if (insuranceTypes === null) {
      setQueryParam('insurance_types', insuranceCategories.join(','));
    }

    if (providerTypes === null) {
      setQueryParam('provider_types', providerCategories.join(','));
    }

    if (genderTypes === null) {
      setQueryParam('gender_types', genderCategories.join(','));
    }
  }, [resourceTypes, setQueryParam]);

  const handleClickResourceType = useCallback(
    (category: string) => {
      if (resourceTypeSet.has(category)) {
        resourceTypeSet.delete(category);
      } else {
        resourceTypeSet.add(category);
      }

      const newArr = Array.from(resourceTypeSet).sort();
      setQueryParam('resource_types', newArr.join(','));
    },
    [resourceTypeSet, setQueryParam],
  );

  const handleClickSelectAll = useCallback(() => {
    const value =
      resourceCategories.length !== resourceTypeSet.size
        ? resourceCategories.join(',')
        : '';
    setQueryParam('resource_types', value);
  }, [resourceTypeSet.size, setQueryParam]);

  const handleTriggerClick = useCallback((type: 'medical' | 'nonMedical') => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  }, []);

  const isMedicalActive = activeDropdown === 'medical';
  const isNonMedicalActive = activeDropdown === 'nonMedical';

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger
          onClick={() => handleTriggerClick('medical')}
          className={`${isMedicalActive ? 'text-primary' : ''}`}
        >
          Medical Providers
        </AccordionTrigger>
        <AccordionContent
          className={`flex ${isMapSidebar ? 'max-h-[250px] overflow-y-scroll' : ''} flex-col gap-2 py-2`}
        >
          <MedicalProviderFilters isMapSidebar={isMapSidebar} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger
          onClick={() => handleTriggerClick('nonMedical')}
          className={`${isNonMedicalActive ? 'text-primary' : ''}`}
        >
          Non-Medical Providers
        </AccordionTrigger>
        <AccordionContent
          className={`flex ${isMapSidebar ? 'max-h-[250px] overflow-y-scroll' : ''} flex-col gap-2 py-2`}
        >
          <div className="flex gap-2">
            <div className="flex items-center">
              <Checkbox
                onClick={handleClickSelectAll}
                checked={resourceCategories.length === resourceTypeSet.size}
              />
            </div>
            <div>Select All</div>
          </div>
          {resourceCategories.map((category) => (
            <div className="flex gap-2" key={category}>
              <div className="flex items-center">
                <Checkbox
                  checked={resourceTypeSet.has(category)}
                  onClick={() => handleClickResourceType(category)}
                />
              </div>
              <div>{category}</div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

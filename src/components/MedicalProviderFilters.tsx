import { useQueryParams } from '@/hooks/useQueryParams';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Checkbox } from './ui/checkbox';

interface MedicalProviderFiltersProps {
  isMapSidebar: boolean;
}

const categories = {
  ethnicity: [
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'White or Caucasian',
    'Native American or Alaska Native',
    'Pacific Islander',
    'Multiracial',
    'Other',
  ],
  insurance: [
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
  ],
  provider: [
    'Psychiatrist',
    'Psychologist',
    'Licensed Clinical Social Worker',
    'Licensed Chemical Dependency Specialist',
    'Licensed Professional Counselor',
  ],
  gender: ['Female', 'Male', 'Other'],
};

export function MedicalProviderFilters({
  isMapSidebar,
}: MedicalProviderFiltersProps) {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const filterStates = useMemo(() => {
    return Object.keys(categories).reduce(
      (acc, key) => {
        const types = getQueryParam(`${key}_types`);
        acc[key] = new Set(types?.split(',') || []);
        return acc;
      },
      {} as Record<string, Set<string>>,
    );
  }, [getQueryParam]);

  const handleClick = useCallback(
    (category: string, type: string) => {
      const updatedSet = new Set(filterStates[category]);
      if (updatedSet.has(type)) {
        updatedSet.delete(type);
      } else {
        updatedSet.add(type);
      }
      setQueryParam(
        `${category}_types`,
        Array.from(updatedSet).sort().join(','),
      );
    },
    [filterStates, setQueryParam],
  );

  const handleClickSelectAll = useCallback(
    (category: string) => {
      const categoriesList = categories[category as keyof typeof categories];
      const allSelected = categoriesList.length === filterStates[category].size;
      const newValue = allSelected ? '' : categoriesList.join(',');
      setQueryParam(`${category}_types`, newValue);
    },
    [filterStates, setQueryParam],
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(categories).map(([key, categoryList]) => (
        <AccordionItem key={key} value={`item-${key}`} className="border-none">
          <AccordionTrigger>{capitalizeFirstLetter(key)}</AccordionTrigger>
          <AccordionContent
            className={`flex ${isMapSidebar} flex-col gap-2 py-2`}
          >
            <div className="flex gap-2">
              <div className="flex items-center">
                <Checkbox
                  onClick={() => handleClickSelectAll(key)}
                  checked={categoryList.length === filterStates[key].size}
                />
              </div>
              <div>Select All</div>
            </div>
            {categoryList.map((type) => (
              <div className="flex gap-2" key={uuid()}>
                <div className="flex items-center">
                  <Checkbox
                    checked={filterStates[key].has(type)}
                    onClick={() => handleClick(key, type)}
                  />
                </div>
                <div>{type}</div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

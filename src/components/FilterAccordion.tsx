import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
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

interface FilterAccordionProps {
  isMapSidebar: boolean;
}

export function FilterAccordion({ isMapSidebar }: FilterAccordionProps) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const resourceTypes = getQueryParam('resource_types');
  const resourceTypeSet = new Set(resourceTypes?.split(','));

  useEffect(
    function () {
      if (resourceTypes === null) {
        setQueryParam('resource_types', resourceCategories.join(','));
      }
    },
    [resourceTypes, setQueryParam],
  );

  function handleClickResourceType(category: string) {
    if (resourceTypeSet.has(category)) {
      resourceTypeSet.delete(category);
    } else {
      resourceTypeSet.add(category);
    }

    const newArr = Array.from(resourceTypeSet);

    setQueryParam('resource_types', newArr.sort().join(','));
  }

  function handleClickSelectAll() {
    let value = '';

    if (resourceCategories.length !== resourceTypeSet.size) {
      value = resourceCategories.join(',');
    }

    setQueryParam('resource_types', value);
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Medical Providers</AccordionTrigger>
        <AccordionContent
          className={`flex ${isMapSidebar && 'max-h-[250px] overflow-y-scroll'} flex-col gap-2 py-2`}
        ></AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Non-Medical Providers</AccordionTrigger>
        <AccordionContent
          className={`flex ${isMapSidebar && 'max-h-[250px] overflow-y-scroll'} flex-col gap-2 py-2`}
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
            <div className="flex gap-2" key={uuid()}>
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

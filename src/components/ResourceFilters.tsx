import { serviceCategories } from '@/config/misc';
import { useQueryParams } from '@/hooks/useQueryParams';
import { HeartHandshake } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { Checkbox } from './ui/Checkbox';
import { Label } from './ui/Label';
import { Separator } from './ui/Separator';

export function ResourceFilters() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const currentResourceTypes = useMemo(() => {
    const typesParam = getQueryParam('resource_types');
    return typesParam ? new Set(typesParam.split(',')) : new Set<string>();
  }, [getQueryParam]);

  const handleCheckboxSelectAllClick = useCallback(() => {
    const isCurrentlyAllSelected =
      currentResourceTypes.size === serviceCategories.length;

    if (isCurrentlyAllSelected) {
      setQueryParam('resource_types', '');
    } else {
      setQueryParam('resource_types', serviceCategories.join(','));
    }
  }, [currentResourceTypes, setQueryParam]);

  const handleCheckboxClick = useCallback(
    (serviceCategory: string) => {
      const newResourceTypes = new Set(currentResourceTypes);

      if (newResourceTypes.has(serviceCategory)) {
        newResourceTypes.delete(serviceCategory);
      } else {
        newResourceTypes.add(serviceCategory);
      }

      const typesString = Array.from(newResourceTypes).join(',');
      setQueryParam('resource_types', typesString);
    },
    [currentResourceTypes, setQueryParam],
  );

  const isAllSelected = currentResourceTypes.size === serviceCategories.length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="flex items-center gap-x-4 text-lg">
        <HeartHandshake />
        Resource Filters
      </h3>
      <Separator className="bg-primary" />
      <div className="flex max-h-[160px] flex-col gap-4 overflow-x-hidden overflow-y-scroll">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={() => handleCheckboxSelectAllClick()}
          />
          <Label>Select All</Label>
        </div>
        {serviceCategories.map((category) => (
          <div key={category} className="flex gap-4">
            <Checkbox
              checked={currentResourceTypes.has(category)}
              onCheckedChange={() => handleCheckboxClick(category)}
            />
            <Label>{category}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

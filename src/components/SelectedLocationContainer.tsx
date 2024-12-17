import { serviceCategoryIconsLucide } from '@/config/misc';
import { Resource } from '@/types';

interface SelectedLocationContainerProps {
  resource: Resource;
  serviceAtLocationIdx: number;
}

export function SelectedLocationContainer({
  resource,
  serviceAtLocationIdx,
}: SelectedLocationContainerProps) {
  const data = resource.serviceAtLocation[serviceAtLocationIdx];
  const service = data?.service;
  const category = service?.category;

  const Icon =
    serviceCategoryIconsLucide[
      category as keyof typeof serviceCategoryIconsLucide
    ];

  return (
    <div className="flex flex-col items-start gap-4 rounded border border-primary p-4">
      <div>
        <h3>Name:</h3>
        <p>{service?.name}</p>
      </div>
      <div>
        <h3 className="flex gap-4">Category:</h3>
        <p className="flex gap-4">
          <Icon /> {category}
        </p>
      </div>
    </div>
  );
}

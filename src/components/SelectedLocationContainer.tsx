import { serviceCategoryIconsLucide } from '@/config/misc';
import { useResourceContext } from '@/context/ResourceProvider';
import { Resource } from '@/types';
import { CircleX } from 'lucide-react';

interface SelectedLocationContainerProps {
  resource: Resource;
  serviceAtLocationIdx: number;
}

export function SelectedLocationContainer({
  resource,
  serviceAtLocationIdx,
}: SelectedLocationContainerProps) {
  const { deleteSelectedResource } = useResourceContext();
  const { id } = resource;
  const data = resource.serviceAtLocation[serviceAtLocationIdx];
  const service = data?.service;
  const category = service?.category;

  const Icon =
    serviceCategoryIconsLucide[
      category as keyof typeof serviceCategoryIconsLucide
    ];

  return (
    <div className="flex flex-col items-start gap-4 rounded border border-primary p-4">
      <div className="w-full">
        <h3 className="flex items-center justify-between">
          Name:
          <CircleX
            onClick={() =>
              deleteSelectedResource({ locationId: id, serviceAtLocationIdx })
            }
            className="cursor-pointer transition hover:text-primary/90"
            size={20}
          />
        </h3>
        <p>{service?.name}</p>
      </div>
      <div>
        <h3 className="flex gap-4">Category:</h3>
        <p className="flex items-center gap-4">
          <Icon size={30} /> {category}
        </p>
      </div>
    </div>
  );
}

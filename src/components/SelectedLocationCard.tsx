import { serviceCategoryIconsLucide } from '@/config/misc';
import { useResourceContext } from '@/context/ResourceProvider';
import { Resource } from '@/types';
import { X } from 'lucide-react';

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
          <X
            onClick={() =>
              deleteSelectedResource({ locationId: id, serviceAtLocationIdx })
            }
            className="cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
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

'use client';

import { useResourceContext } from '@/context/ResourceProvider';
import { MapPinCheck } from 'lucide-react';
import { SelectedLocationContainer } from './SelectedLocationContainer';
import { SendMessageButton } from './SendMessageButton';
import { Separator } from './ui/Separator';

export function MapSidebarSelectedResources() {
  const { resources, selectedResources } = useResourceContext();

  const selectedResourceObjs = resources.flatMap((resource) => {
    return selectedResources
      .filter(({ locationId }) => locationId === resource.id)
      .map((selection) => ({
        ...resource,
        serviceAtLocationIdx: selection.serviceAtLocationIdx,
      }));
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="flex items-center gap-x-4 text-lg">
        <MapPinCheck />
        Selected Resources
      </h3>
      <Separator className="bg-primary" />
      {selectedResourceObjs.length === 0 ? (
        <div className="text-center">You Have No Selected Resources</div>
      ) : (
        selectedResourceObjs.map((resourceWithIdx) => (
          <SelectedLocationContainer
            key={`${resourceWithIdx.id}-${resourceWithIdx.serviceAtLocationIdx}`}
            resource={resourceWithIdx}
            serviceAtLocationIdx={resourceWithIdx.serviceAtLocationIdx}
          />
        ))
      )}
      <Separator className="bg-primary" />
      <SendMessageButton />
    </div>
  );
}

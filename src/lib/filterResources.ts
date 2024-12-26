import { haversineDistance } from '@/lib/haversineDistance';
import { Point, Resource } from '@/types';
import { Heap } from 'heap-js';

interface FilterResourcesParams {
  resources: Resource[];
  radius: number;
  resourceTypes: string[];
  numResources: number;
  mapCenter: Point;
  hashmap: Map<string, number>;
}

export function filterResources({
  hashmap,
  resources,
  radius,
  resourceTypes,
  numResources,
  mapCenter,
}: FilterResourcesParams) {
  const customHeapCompare = (resource1: Resource, resource2: Resource) =>
    (hashmap.get(resource1.id) as number) -
    (hashmap.get(resource2.id) as number);

  const resourceTypesSet = new Set(resourceTypes);
  const minHeap = new Heap<Resource>(customHeapCompare);
  minHeap.setLimit(numResources);

  for (const resource of structuredClone(resources)) {
    resource.serviceAtLocation = resource.serviceAtLocation.filter(
      (serviceAtLocation) => {
        const serviceCategory = serviceAtLocation.service?.category as string;
        return resourceTypesSet.has(serviceCategory);
      },
    );

    if (resource.serviceAtLocation.length === 0) {
      continue;
    }

    const dist = haversineDistance({
      point1: mapCenter,
      point2: { latitude: resource.latitude, longitude: resource.longitude },
    });

    if (dist > radius) continue;

    hashmap.set(resource.id, dist);
    minHeap.add(resource);
  }

  return minHeap.toArray();
}

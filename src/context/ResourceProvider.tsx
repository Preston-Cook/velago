'use client';

import { Resource } from '@/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ResourceContextType = {
  resources: Resource[];
  selectedResources: SelectedResources[];
  addSelectedResource(resourceIdentifier: SelectedResources): void;
  deleteSelectedResource(resourceIdentifier: SelectedResources): void;
  isLoading: boolean;
  error: string | null;
};

// Create the context
const ResourceContext = createContext<ResourceContextType | undefined>(
  undefined,
);

// Custom hook to use the context
export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error(
      'useResourceContext must be used within a ResourceProvider',
    );
  }
  return context;
};

type ResourceProviderProps = {
  children: ReactNode;
};

export interface SelectedResources {
  locationId: string;
  serviceAtLocationIdx: number;
}

export const ResourceProvider = ({ children }: ResourceProviderProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResources, setSelectedResources] = useState<
    SelectedResources[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a resource if it does not already exist (ensuring uniqueness)
  function addSelectedResource(resourceIdentifier: SelectedResources) {
    setSelectedResources((prev) => {
      const exists = prev.some(
        (r) =>
          r.locationId === resourceIdentifier.locationId &&
          r.serviceAtLocationIdx === resourceIdentifier.serviceAtLocationIdx,
      );

      // Add only if it doesn't exist
      return exists ? prev : [...prev, resourceIdentifier];
    });
  }

  // Remove a resource
  function deleteSelectedResource(resourceIdentifier: SelectedResources) {
    setSelectedResources((prev) =>
      prev.filter(
        (r) =>
          r.locationId !== resourceIdentifier.locationId ||
          r.serviceAtLocationIdx !== resourceIdentifier.serviceAtLocationIdx,
      ),
    );
  }

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Resource[] = await response.json();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <ResourceContext.Provider
      value={{
        resources,
        isLoading,
        error,
        addSelectedResource,
        deleteSelectedResource,
        selectedResources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

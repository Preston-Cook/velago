// ResourceContext.tsx
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

export const ResourceProvider = ({ children }: ResourceProviderProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    <ResourceContext.Provider value={{ resources, isLoading, error }}>
      {children}
    </ResourceContext.Provider>
  );
};

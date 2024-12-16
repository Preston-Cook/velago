import { Resource } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from './ui/Separator';

interface MapMarkerPopupProps {
  resource: Resource;
  serviceAtLocationIdx: number;
  handleBackClick(): void;
  handleForwardClick(): void;
}

export function MapMarkerPopupContent({
  resource,
  serviceAtLocationIdx,
  handleBackClick,
  handleForwardClick,
}: MapMarkerPopupProps) {
  const { name, serviceAtLocation } = resource;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="w-6">
          <ArrowLeft
            onClick={handleBackClick}
            className={`cursor-pointer text-primary hover:text-primary/90 ${serviceAtLocationIdx === 0 && 'hidden'}`}
          />
        </div>

        <h3 className="flex-1 text-center text-lg text-white">{name}</h3>
        <div className="w-6">
          <ArrowRight
            onClick={handleForwardClick}
            className={`cursor-pointer text-primary hover:text-primary/90 ${serviceAtLocationIdx >= serviceAtLocation.length - 1 && 'hidden'}`}
          />
        </div>
      </div>
      <Separator className="bg-primary" />
      <div className="text-primary"></div>
    </div>
  );
}

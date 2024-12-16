import { useQueryParams } from '@/hooks/useQueryParams';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from './ui/Label';
import { Separator } from './ui/Separator';
import { Slider } from './ui/Slider';

export function BaseFilters() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const [radius, setRadius] = useState(10);
  const [numResources, setNumResources] = useState(10);

  useEffect(() => {
    const radiusParam = getQueryParam('radius');
    const numResourcesParam = getQueryParam('num_resources');

    if (radiusParam) {
      setRadius(Number(radiusParam));
    }

    if (numResourcesParam) {
      setNumResources(Number(numResourcesParam));
    }
  }, [getQueryParam]);

  function handleRadiusChange(e: number[]) {
    setRadius(e[0]);
    setQueryParam('radius', `${e[0]}`);
  }

  function handleNumResourcesChange(e: number[]) {
    setNumResources(e[0]);
    setQueryParam('num_resources', `${e[0]}`);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="flex items-center gap-x-4 text-lg">
        <SlidersHorizontal />
        Base Filters
      </h3>
      <Separator className="bg-primary" />
      <Label>Radius: &lt; {radius} mi.</Label>
      <Slider
        value={[radius]}
        name="radius"
        step={5}
        onValueChange={handleRadiusChange}
        min={5}
        max={25}
      />

      <Separator className="bg-primary" />
      <Label>Num. Resources: {numResources}</Label>
      <Slider
        value={[numResources]}
        name="num_resources"
        onValueChange={handleNumResourcesChange}
        min={1}
        max={10}
      />
    </div>
  );
}

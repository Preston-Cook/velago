import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ className, size }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn(className, 'animate-spin text-primary')}
    />
  );
}

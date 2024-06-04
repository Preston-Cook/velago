import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  onClick?(): void;
}

export default function SubmitButton({
  isLoading,
  children,
  type,
  onClick,
}: SubmitButtonProps) {
  return (
    <Button
      className="mt-8 w-[60%] max-w-[500px] text-white"
      type={type ?? 'submit'}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}

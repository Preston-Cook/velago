import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  isLoading,
  children,
}: SubmitButtonProps) {
  return (
    <Button
      className="w-[60%] max-w-[500px] mt-8"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}

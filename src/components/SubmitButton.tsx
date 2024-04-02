import { Button } from './ui/button';
import Spinner from './Spinner';

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
      className="w-full sm:w-[40%] mt-8"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
}

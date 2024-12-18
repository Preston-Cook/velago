import { useResourceContext } from '@/context/ResourceProvider';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

export function SendMessageButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedResources } = useResourceContext();

  async function handleClick() {
    setIsLoading(true);
    setIsLoading(false);
    toast.success('Message sent Successfully!', {
      description: 'Your message was sent.',
    });
  }

  return (
    <Button
      className="w-full"
      onClickCapture={handleClick}
      disabled={selectedResources.length === 0 || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner size={1} />
      ) : (
        <>
          <Send />
          {'Send Message'}
        </>
      )}
    </Button>
  );
}

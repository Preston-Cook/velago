import { useState } from 'react';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

export function SendMessageButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    await fetch('/api/message', { method: 'POST' });
    setIsLoading(false);
  }

  return (
    <Button
      onClickCapture={handleClick}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? <Spinner size={1} /> : 'Send Message'}
    </Button>
  );
}

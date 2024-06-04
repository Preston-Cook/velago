import { Button } from './ui/button';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  text: string;
}

export function GoogleLoginButton({ text }: GoogleLoginButtonProps) {
  return (
    <Button variant="outline" type="button" className="w-full bg-secondary">
      <span className="mr-2">
        <Image
          src="/images/google-logo.png"
          alt="google-logo"
          height={25}
          width={25}
        />
      </span>
      {text}
    </Button>
  );
}

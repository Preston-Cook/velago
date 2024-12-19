import { SendResourceForm } from '@/components/forms/SendResourceForm';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useResourceContext } from '@/context/ResourceProvider';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function SendMessageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedResources } = useResourceContext();

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger disabled={selectedResources.length === 0} asChild>
        <Button className="flex w-full items-center justify-center gap-4">
          <Send />
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-primary bg-secondary sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Yourself a Message</DialogTitle>
          <DialogDescription>
            Enter your phone number to text yourself details about your selected
            resources.
          </DialogDescription>
        </DialogHeader>
        <div>
          <SendResourceForm handleClose={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

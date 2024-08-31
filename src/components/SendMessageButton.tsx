import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { TextField } from './TextField';
import { TextareaField } from './TextareaField';
import { Separator } from './ui/separator';

export function SendMessageButton() {
  const sendResourceInformationSchema = z.object({
    phone: z.string(),
    resourceInfo: z.string(),
  });

  const form = useForm<z.infer<typeof sendResourceInformationSchema>>({
    resolver: zodResolver(sendResourceInformationSchema),
    defaultValues: {
      phone: '',
      resourceInfo: '',
    },
  });

  const { control, getValues, setValue, handleSubmit: handleSubmitHook } = form;

  async function handleSubmit() {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="w-full text-white">Connect</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>
            Text yourself resource information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmitHook(handleSubmit)}>
            <div className="grid gap-4">
              <TextField
                name="phone"
                control={control}
                placeholder={'(123)-456-7890'}
                label="Phone"
              />
              <TextareaField
                name="resourceInfo"
                placeholder="Resource info here..."
                control={control}
                label="Resource Information"
              />
            </div>
          </form>
        </Form>
        <Separator className="text-primary my-4" />
        <Button className="text-white w-full" type="submit">
          Send Message
        </Button>
      </DialogContent>
    </Dialog>
  );
}

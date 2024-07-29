import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GeolocationPromptProps {
  onUseCurrentLocationSelection(e: boolean): void;
  isOpenPrompt: boolean;
}

export function GeolocationPrompt({
  onUseCurrentLocationSelection,
  isOpenPrompt,
}: GeolocationPromptProps) {
  return (
    <Dialog
      open={isOpenPrompt}
      onOpenChange={() => onUseCurrentLocationSelection(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Use Current Location?</DialogTitle>
          <DialogDescription>
            Choose to use your current location
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => onUseCurrentLocationSelection(true)}
            className="text-white"
          >
            Use Current Location
          </Button>
          <Button
            onClick={() => onUseCurrentLocationSelection(false)}
            variant="outline"
          >
            Do Not Use Current Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

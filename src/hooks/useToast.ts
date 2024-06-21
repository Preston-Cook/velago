import { useToast as useToastShadcn } from '@/components/ui/use-toast';
import { useLocale } from './useLocale';

interface ShowToastSuccessParams {
  title: string;
  description: string;
}

interface ShowToastErrorParams {
  title?: string;
  description?: string;
}

export function useToast() {
  const { toast } = useToastShadcn();
  const { locale } = useLocale();

  function showToastSuccess({ title, description }: ShowToastSuccessParams) {
    toast({ title, description });
  }

  function showToastError({ title, description }: ShowToastErrorParams = {}) {
    title ??=
      locale === 'en' ? 'Uh oh! Something went wrong' : '¡Ay! Algo salió mal.';
    description ??=
      locale === 'en'
        ? 'There was a problem with your request'
        : '¡Ay! Algo salió mal.';

    toast({ title, description, variant: 'destructive' });
  }

  return { showToastSuccess, showToastError };
}

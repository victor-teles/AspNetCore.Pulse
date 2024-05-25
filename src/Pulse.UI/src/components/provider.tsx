import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './ui/tooltip';

export type ProviderProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient()

export const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
          {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

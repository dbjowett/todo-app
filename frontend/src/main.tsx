import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SessionProvider } from './providers/AuthProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MantineProvider>
          <App />
          <Notifications />
        </MantineProvider>
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>
);

import 'normalize.css';
import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';
import { CountProvider } from 'src/lib/contexts/CountContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { initMocks } from '@/mocks';
import '@/i18n/locales';
import { useEffect, useState } from 'react';
import Inspect from '@/pages/inspect';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const isApiMock = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

const App = ({ Component, pageProps }: AppProps) => {
  const [shouldRender, setShouldRender] = useState(!isApiMock);

  useEffect(() => {
    const setup = async () => {
      await initMocks();
      setShouldRender(true);
    };

    if (isApiMock) {
      setup();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CountProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
        <Inspect />
      </CountProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

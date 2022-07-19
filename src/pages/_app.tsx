import 'normalize.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CountProvider } from '../lib/contexts/CountContext';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CountProvider>
        <Component {...pageProps} />
      </CountProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;

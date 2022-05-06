import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState, Dispatch, SetStateAction, createContext } from 'react';
import 'normalize.css';


interface ContextInterface {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export const Context = createContext({} as ContextInterface);

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [text, setText] = useState('');
  const value = {
    text,
    setText,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={value}>
        <Component {...pageProps} />
      </Context.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

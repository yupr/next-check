import 'normalize.css';
import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';
import { CountProvider } from 'src/lib/contexts/CountContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const [shouldRender, setShouldRender] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== 'true'
  );

  useEffect(() => {
    // 環境変数を変数を介して条件式にした場合、条件の結果がfalseだったとしても、その中の処理がバンドルされる。
    // また関数を作成した時点で、関数の呼び出しの有無に問わずバンドルされる。
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      // TODO: 2度呼ばれているので、mockの起動を確認するスクリプトを書いて、無駄な呼び出しを止める。
      import('../mocks/browser').then((res) => {
        res.worker.start();
        setShouldRender(true);
      });
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
      </CountProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

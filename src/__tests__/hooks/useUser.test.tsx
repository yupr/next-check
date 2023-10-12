import { useUser } from '@/hooks/useUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { FunctionComponent, ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const queryClient = new QueryClient();

const wrapper: FunctionComponent<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('レスポンス: 正常系', async () => {
  localStorage.setItem('isAuth', 'true');

  const { result } = renderHook(() => useUser(), { wrapper });

  // NOTE: tanstack/query 4.35.0 の場合は、こちらの方法以外取得できない。
  await waitFor(() => {
    if (!result.current.isSuccess) {
      throw Error('wait');
    }
  });

  console.log('result', result.current.data);
});

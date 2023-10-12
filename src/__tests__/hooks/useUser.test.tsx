import { useUser } from '@/hooks/useUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('レスポンス: 正常系', async () => {
  jest.spyOn(Storage.prototype, 'setItem');
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');

  const { result } = renderHook(() => useUser(), { wrapper });

  await waitFor(() => result.current.isSuccess);

  // NOTE: tanstack/query 4.35.0 の場合は、こちらの方法以外取得できない。
  await waitFor(() => {
    if (!result.current.isSuccess) {
      throw Error('wait');
    }
  });

  console.log('result', result.current.data);
});

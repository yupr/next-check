import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useApi = <
  TQueryKey extends [string, (string | number)?],
  TQueryFnData,
  TError = AxiosError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1]) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<unknown, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey,
    queryFn: async () => fetcher(queryKey[1]),
    ...options,
  });
};

export const useOptimisticMutation = <TVariables, TError, TData, TContext>(
  queryKey: [string, Record<string, unknown>?],
  fetcher: (params: TVariables) => Promise<TData | void>,
  updater?: ((oldData: TContext, newData: TVariables) => TContext) | undefined,
  options?: Omit<
    UseMutationOptions<TData | void, TError, TVariables, TContext>,
    'onMutate' | 'onError' | 'onSettled'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      return await fetcher(params);
    },
    {
      onMutate: async (data) => {
        // 事前に走っているリクエストがある場合はキャンセルする
        await queryClient.cancelQueries(queryKey);

        // 更新前の現在のデータを取得
        const previousData = queryClient.getQueryData<TContext>(queryKey);

        // 送信予定のデータと更新用の関数を使ってキャッシュデータを更新する
        // ここでUI上のデータは仮のデータに書き換えられる
        if (previousData && updater) {
          queryClient.setQueryData<TContext>(queryKey, () => {
            return updater(previousData, data);
          });
        }

        // データ取得前のデータを返す
        return previousData;
      },
      // APIへの更新が失敗した場合に旧データでロールバックする
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context);
        console.warn(err);
      },
      // すべての処理が終了した際にキャッシュを更新する
      // APIから取得成功した場合は仮のデータから取得したデータに更新
      // 失敗した場合は旧データに更新
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
      ...options,
    }
  );
};

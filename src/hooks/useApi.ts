import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useApi = <
  TQueryKey extends [string, (Record<string, unknown> | string)?],
  TQueryFnData,
  TError,
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

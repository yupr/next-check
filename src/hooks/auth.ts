import { useOptimisticMutation } from '@/hooks/useApi';
import { Login, LoginRes } from '@/types';
import { AxiosResponse } from 'axios';
import axios from '@/lib/axios';

const postLogin = async (params: Login): Promise<LoginRes> => {
  const res: AxiosResponse<LoginRes> = await axios.post('/login', params);
  // Todo: レスポンスの値をヘッダーにセット
  // const token = res.data.token;
  // if (token) {
  //   axios.defaults.headers.common['Authorization'] = token;
  // }
  return res?.data;
};

const useLogin = () => {
  return useOptimisticMutation(['login'], async (params: Login) =>
    postLogin(params)
  );
};

export { useLogin };

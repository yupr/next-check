import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';
import { useApi, useOptimisticMutation } from '@/hooks/useApi';
import { User, Login, LoginRes } from '@/types';

const postLogin = async (params: Login): Promise<LoginRes> => {
  const res: AxiosResponse<LoginRes> = await axios.post('/login', params);
  // Todo: レスポンスの値をヘッダーにセット
  // const token = res.data.token;
  // if (token) {
  //   axios.defaults.headers.common['Authorization'] = token;
  // }
  return res?.data;
};

const getUsers = async (): Promise<User[]> => {
  const res = await axios.get('/users');
  return res?.data;
};

const getNames = async (): Promise<User[]> => {
  const res = await axios.get('/names');
  return res?.data;
};

const useLogin = () => {
  return useOptimisticMutation(['login'], async (params: Login) =>
    postLogin(params)
  );
};

const useUsers = (names?: User[]) => {
  return useApi(['users'], async () => getUsers(), {
    enabled: !!names,
  });
};

const useNames = () => {
  return useApi(['names'], async () => getNames());
};

export { useLogin, useUsers, useNames };

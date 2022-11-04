import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';
import { useApi, useOptimisticMutation } from '@/hooks/useApi';

interface User {
  id: number;
  name: string;
}

interface Login {
  userName: string;
  pass: string | number;
}

interface LoginRes {
  message?: string;
  token?: string;
}

// ------------------------------------------------

const fetchLogin = async (params: Login): Promise<LoginRes> => {
  const res: AxiosResponse<LoginRes> = await axios.post('/login', params);

  // レスポンスの値をヘッダーにセットできるかテスト
  // const token = res.data.token;
  // if (token) {
  //   axios.defaults.headers.common['Authorization'] = token;
  // }
  return res?.data;
};

const useLogin = () => {
  return useOptimisticMutation(['login'], async (params: Login) =>
    fetchLogin(params)
  );
};

// ------------------------------------------------

const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get('/users');
  return res?.data;
};

const useUsers = (isUser: boolean) => {
  return useApi(['users'], async () => fetchUsers(), {
    enabled: !!isUser,
  });
};

// ------------------------------------------------

export { useLogin, useUsers };

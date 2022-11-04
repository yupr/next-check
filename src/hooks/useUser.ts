import axios from '@/lib/axios';
import { useApi, useGenericMutation } from '@/hooks/useApi';

interface User {
  id: number;
  name: string;
}

interface Login {
  userName: string;
  pass: string | number;
}

interface LoginMessage {
  message?: string;
}

// ------------------------------------------------

const fetchLogin = async (params: Login): Promise<LoginMessage> => {
  const res = await axios.post('/login', params);
  return res?.data;
};

const useLogin = () => {
  return useGenericMutation(async (params: Login) => fetchLogin(params));
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

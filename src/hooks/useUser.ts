import axios from '@/lib/axios';
import { useApi } from '@/hooks/useApi';
import { User } from '@/types';

const getUser = async (): Promise<User> => {
  const res = await axios.get('/user');
  return res?.data;
};

const useUser = () => {
  return useApi(['user'], async () => getUser());
};

export { useUser };

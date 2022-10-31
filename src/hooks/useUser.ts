import axios from '@/lib/axios';
import { useApi } from '@/hooks/useApi';

interface User {
  id: number;
  name: string;
}

// api connnect
const fetchUsers = async (): Promise<User[]> => {
  const res = await axios('/users');
  return res?.data;
};

const useUser = (isUser: boolean) => {
  return useApi(['users'], async () => fetchUsers(), {
    enabled: !!isUser,
  });
};

export { useUser };

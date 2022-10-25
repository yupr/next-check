import axios from '@/lib/axios';
import { useApi } from '@/hooks/useApi';

// api connnect
const fetchUsers = async () => {
  const res = await axios('/users');
  return res?.data;
};

const useUser = (isUser: boolean) => {
  return useApi(['users'], async () => fetchUsers(), {
    enabled: !!isUser,
  });
};

export { useUser };

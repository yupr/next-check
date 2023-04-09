import { useApi } from '@/hooks/useApi';
import { User } from '@/api/cli/user';
import { UserApiFactory } from '@/api/cli/user';

const getUser = async (): Promise<User> => {
  const res = await UserApiFactory().loginUser();
  console.log('res', res.data);
  return res.data;
};

const useUser = () => {
  return useApi(['user'], async () => getUser());
};

export { useUser };

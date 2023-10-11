import { useApi } from '@/hooks/common/useApi';
import { User } from '@/api/cli/user';
import { UserApiFactory } from '@/api/cli/user';

const getUser = async (): Promise<User> => {
  const res = await UserApiFactory().loginUser();
  return res.data;
};

const useUser = () => {
  const isAuth = localStorage.getItem('isAuth');
  return useApi(['user'], async () => getUser(), { enabled: !!isAuth });
};

export { useUser };

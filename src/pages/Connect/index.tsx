import { useState } from 'react';
import styles from './index.module.scss';
import { useUsers, useLogin } from '@/hooks/useUser';
import Error from '@/pages/_error';

const Connect = () => {
  const [isUser] = useState(true);
  const [loginMsg, setLoginMsg] = useState<string>('');
  const { data: users, isLoading, isError, error } = useUsers(!!isUser);
  const fetchLogin = useLogin();

  const login = async () => {
    fetchLogin.mutate(
      { userName: 'carl', pass: 'password' },
      {
        onSuccess: (res) => {
          console.log('success', res);

          if (res?.message) {
            setLoginMsg(res.message);
          }
        },
      }
    );
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError && error) {
    const statusCode = error.response?.status;
    return <Error statusCode={statusCode}></Error>;
  }

  return (
    <div className={styles.connect}>
      <h2>ユーザ一覧</h2>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>

      <button className={styles.connect__login} onClick={() => login()}>
        ログイン
      </button>
      <div> {loginMsg}</div>
    </div>
  );
};

export default Connect;

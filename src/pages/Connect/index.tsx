import { useState } from 'react';
import styles from './index.module.scss';
import { useUsers, useLogin } from '@/hooks/useUser';

const Connect = () => {
  const [isUser] = useState(true);
  const { data: users, isLoading, isError } = useUsers(!!isUser);
  const fetchLogin = useLogin();

  const login = async () => {
    fetchLogin.mutate(
      { userName: 'carl', pass: 'password' },
      {
        onSuccess: (res) => {
          console.log('success', res);
        },
      }
    );
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
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
    </div>
  );
};

export default Connect;

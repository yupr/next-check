import { useState } from 'react';
import styles from './index.module.scss';
import { useUser } from '@/hooks/useUser';

const Connect = () => {
  const [isUser] = useState(true);
  const { data, isLoading, isError } = useUser(!!isUser);

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
        {data.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Connect;

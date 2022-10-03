import { useState } from 'react';
import styles from './index.module.scss';
import { UserData } from '@/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const { data } = await axios('https://jsonplaceholder.typicode.com/users');
  return data;
};

const Connect = () => {
  const [isUser] = useState(true);
  const { data, isLoading, isError, error, isFetching } = useQuery<
    UserData[],
    Error
  >(['user'], fetchUsers, { enabled: !!isUser });

  // useEffect(() => {
  //   const fetch = async () => {
  //     const result = await axios('/api/v1/sample');
  //     console.log('Result', result.data);
  //   };
  //   fetch();
  // }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isFetching) {
    return <div>Refreshing...</div>;
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

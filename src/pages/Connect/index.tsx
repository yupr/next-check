import { useQuery } from 'react-query';
import { UserData } from '@/types';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios('https://jsonplaceholder.typicode.com/users');
  return data;
};

const Connect = () => {
  const { data, isLoading, isError, error } = useQuery<UserData[], Error>(
    'users',
    fetchUsers
  );

  // connect to express api
  // useEffect(() => {
  //   const fetch = async () => {
  //     const result = await axios('/api/v1/sample');
  //     console.log('result', result);
  //   };

  //   fetch();
  // }, []);

  // undefined対応: isLoadingがfalseになるまでmap関数を実行しない。(下記tsxがレンダリングされない)
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error && (isError || !data)) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h2>ユーザ一覧</h2>
      <div>
        {data &&
          data.map((user: UserData) => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  );
};

export default Connect;

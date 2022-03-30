import React from 'react';
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

  // undefined対応: isLoadingがfalseになるまでmap関数を実行しない。(下記tsxがレンダリングされない)
  if (isLoading) {
    return <span>Loading...</span>;
  }

  //エラー対応
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

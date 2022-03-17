import React from 'react';
import { useQuery } from 'react-query';
import { UserData } from '@/types';

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

const Connect = () => {
  const { data, isLoading, isError, error } = useQuery('users', fetchUsers);

  //undefined対応: isLoadingがfalseになるまでmap関数を実行しない。(下記tsxがレンダリングされない)
  if (isLoading) {
    return <span>Loading...</span>;
  }

  //エラー対応
  if (isError || !data) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h2>ユーザ一覧</h2>
      <div>
        {data.map((user: UserData) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};
export default Connect;

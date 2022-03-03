import React from 'react';
import {
  useQuery,
} from 'react-query';

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

const Connect = () => {
  const { data, isLoading, isError, error } = useQuery('users', fetchUsers);

  console.log('data', data, isError)

  //undefined対応: isLoadingがfalseになるまでmap関数を実行しない。(下記tsxがレンダリングされない)
  if(isLoading){
    return <span>Loading...</span>
  }

  //エラー対応
  if(isError){
    return <span>Error: {error.message}</span>;
  }


  return (
    <div>
      <h2>ユーザ一覧</h2>
      <div>
        {data.map((user: any) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};
export default Connect;

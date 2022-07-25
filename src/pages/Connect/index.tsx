import { UserData } from '@/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const { data } = await axios('https://jsonplaceholder.typicode.com/users');
  return data;
};

const Connect = () => {
  const { data, isLoading, isError, error } = useQuery<UserData[], Error>(
    ['user'],
    fetchUsers
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
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

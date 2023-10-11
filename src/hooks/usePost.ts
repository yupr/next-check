import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';
import { useApi } from '@/hooks/common/useApi';
import { Post } from '@/types/index';

const fetchPosts = async (page: number): Promise<Post[]> => {
  const res: AxiosResponse<Post[]> = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  return res?.data;
};

const usePost = (page: number) => {
  return useApi(['posts', page], async () => fetchPosts(page), {
    keepPreviousData: true,
  });
};

export { usePost };

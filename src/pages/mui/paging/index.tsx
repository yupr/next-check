import { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Post } from '@/types/index';

const Paging = () => {
  const [page, setPage] = useState(1);

  const fetchProjects = (page = 1) =>
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    ).then((res) => res.json());

  const { isLoading, isError, error, data, isPreviousData } = useQuery<
    Post[],
    Error
  >(['projects', page], () => fetchProjects(page), {
    keepPreviousData: true,
  });

  const updatePageNumber = (event: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.paging}>
      <div className={styles.paging__content}>
        {data.map((result: Post, index: number) => (
          <p key={index}>{result.body}</p>
        ))}
      </div>

      <Stack sx={{ mt: 1 }}>
        <Pagination
          count={10}
          shape="rounded"
          color="primary"
          onChange={updatePageNumber}
          page={page}
          disabled={isPreviousData || !data}
        />
      </Stack>
    </div>
  );
};

export default Paging;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';

type userType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Pagination = () => {
  const [page, setPage] = useState(1);

  const fetchProjects = (page = 1) =>
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    ).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery<userType[], Error>(['projects', page], () => fetchProjects(page), {
      keepPreviousData: true,
    });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__content}>
        {data.map((result: userType, index: number) => (
          <p key={index}>{result.body}</p>
        ))}
      </div>
      <div className={styles.pagination__page}>
        <div className={styles.pagination__page__current}>
          Current Page: {page}
        </div>
        <button
          className={styles.pagination__page__buttonDisable}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            if (!isPreviousData && data) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPreviousData || !data}
        >
          Next Page
        </button>
        {isFetching ? <div> Loading...</div> : null}{' '}
      </div>
    </div>
  );
};

export default Pagination;

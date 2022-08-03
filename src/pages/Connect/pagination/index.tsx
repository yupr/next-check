import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import styles from './index.module.scss';
// import axios from 'axios';

const Pagination = () => {
  const [page, setPage] = useState(1);

  const fetchProjects = (page = 1) =>
    fetch(
      'https://api.github.com/search/code?q=addClass+user%3Amozilla&page=' +
        page
    ).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery<any, Error>(['projects', page], () => fetchProjects(page), {
      keepPreviousData: true,
    });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div>
        {data.items.map((project: any, index: number) => (
          <p key={index}>{project.name}</p>
        ))}
      </div>
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data.items) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData || !data?.items}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
};

export default Pagination;

import { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Post } from '@/types/index';
import { css } from '@emotion/react';

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

  // Todo: 共通化 ---------------------
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // --------------------------------

  const paging = css({
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <div css={paging}>
      <div css={css({ width: '750px', height: '600px' })}>
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

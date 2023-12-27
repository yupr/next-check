import { useState, ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Container, Box } from '@mui/system';
import { usePost } from '@/hooks/usePost';
import { Post } from '@/types/index';

const Paging = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data, isPreviousData } = usePost(page);

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
    <Container maxWidth="md" sx={{ marginTop: 7 }}>
      <Box>
        {data.map((result: Post, index: number) => (
          <p key={index}>{result.body}</p>
        ))}
      </Box>

      <Stack sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={10}
          shape="rounded"
          color="primary"
          onChange={updatePageNumber}
          page={page}
          disabled={isPreviousData || !data}
        />
      </Stack>
    </Container>
  );
};

export default Paging;

import Button from '@mui/material/Button';
import { css } from '@emotion/react';

const Mui = () => {
  const login = () => {
    console.log('logined');
  };

  return (
    <>
      <div css={css({ margin: '20px 0' })}>
        <h2>MUI Components</h2>
        <Button onClick={login} variant="contained">
          Login
        </Button>
      </div>
    </>
  );
};

export default Mui;

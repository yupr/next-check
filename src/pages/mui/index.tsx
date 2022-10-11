import Button from '@mui/material/Button';
import styles from './index.module.scss';

const Mui = () => {
  const login = () => {
    console.log('logined');
  };

  return (
    <>
      <div className={styles.mui}>
        <h2>MUI Components</h2>
        <Button onClick={login} variant="contained">
          Login
        </Button>
      </div>
    </>
  );
};

export default Mui;

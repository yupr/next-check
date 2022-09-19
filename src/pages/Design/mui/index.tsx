import styles from './index.module.scss';
import Button from '@mui/material/Button';

const MUI = () => {
  const login = () => {
    console.log('logined');
  };

  return (
    <>
      <div className={styles.mui}>
        <p>MUI Components Inspect</p>
        <Button onClick={login} variant="contained">
          Login
        </Button>
      </div>
    </>
  );
};

export default MUI;

import { useCountContext } from '@/lib/contexts/CountContext';
import Button from '@mui/material/Button';
import styles from './index.module.scss';

const Inspect = () => {
  const { count, setCount, countDown } = useCountContext();

  const login = () => {
    console.log('logined');
  };

  return (
    <>
      <div>
        <h2>context</h2>
        <p>count: {count}</p>
        <input type="button" value="+1" onClick={() => setCount(count + 1)} />
        <input type="button" value="-1" onClick={countDown} />
      </div>

      <div className={styles.mui}>
        <h2>MUI Components</h2>
        <Button onClick={login} variant="contained">
          Login
        </Button>
      </div>
    </>
  );
};

export default Inspect;

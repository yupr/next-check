import styles from './index.module.scss';
import Button from '@/components/atoms/Button';

const Design = () => {
  const login = () => {
    console.log('logined');
  };

  return (
    <>
      <div className={styles.design}>
        <p>自作componentを試す</p>
        <Button className="button" onClick={login}>
          Button
        </Button>
      </div>
    </>
  );
};

export default Design;

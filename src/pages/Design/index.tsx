import { useState } from 'react';
import styles from './index.module.scss';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader/Oval';

const Design = () => {
  const [isLoad, setIsLoad] = useState(true);

  setTimeout(() => {
    setIsLoad(false);
  }, 3000);

  const login = () => {
    console.log('logined');
  };

  if (isLoad) {
    return <Loader isVisible={isLoad} />;
  }

  return (
    <>
      <div className={styles.design}>
        <p>component</p>
        <Button className="button" onClick={login}>
          Button
        </Button>
      </div>
    </>
  );
};

export default Design;

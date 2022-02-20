import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const Query = () => {
  const router = useRouter();
  const { step } = router.query;

  useEffect(() => {
    router.replace({
      pathname: '/query',
      query: { step: 1 },
    });
  }, []);

  const toNext = () => {
    router.push({
      pathname: '/query',
      query: { step: Number(step) + 1 },
    });
  };

  return (
    <div className={styles.query}>
      {router.isReady && (
        <>
          {Number(step) === 1 && <p>query1</p>}
          {Number(step) === 2 && <p>query2</p>}
          {Number(step) === 3 && <p>query3</p>}
          {Number(step) === 4 && <p>query4</p>}
        </>
      )}
      <input type="button" onClick={toNext} value="次へ" />
    </div>
  );
};

export default Query;

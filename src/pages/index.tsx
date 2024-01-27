import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>窓口</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Link</h1>

          <div className={styles.grid}>
            <Link href="/inspect/connect" className={styles.card}>
              <h2>Connect &rarr;</h2>
              <p>For check api connect</p>
            </Link>

            <Link href="/inspect/pixi" className={styles.card}>
              <h2>Pixi</h2>
              <p>render canvas</p>
            </Link>

            <div className={styles.card}>
              <h2>Material UI</h2>

              <Link href="/mui/paging">
                <h3>Pagination</h3>
              </Link>

              <Link href="/mui/checkbox">
                <h3>List</h3>
              </Link>
            </div>

            <div className={styles.card}>
              <h2>Animation</h2>

              <Link href="/animation/sample1">
                <h3>sample1</h3>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

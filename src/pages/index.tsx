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
            <Link href="/list" className={styles.card}>
              <h2>List</h2>
              <p>For check checkBox list</p>
            </Link>

            <Link href="/connect" className={styles.card}>
              <h2>Connect &rarr;</h2>
              <p>For check api connect</p>
            </Link>

            <Link href="/validation" className={styles.card}>
              <h2>Validation &rarr;</h2>
              <p>For check react-hook-form</p>
            </Link>

            <Link href="/pixi" className={styles.card}>
              <h2>Pixi</h2>
              <p>render canvas</p>
            </Link>

            <Link href="/paging" className={styles.card}>
              <h2>Pagination</h2>
              <p>check material ui</p>
            </Link>

            <div className={styles.card}>
              <h2>Animation</h2>

              <Link href="/animation/sample1">
                <h3>sample1</h3>
              </Link>

              {/* <Link href="/animation/sample2">
                <h3>sample2</h3>
              </Link> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

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
          <meta name="description" content="Generated by create next app" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Link</h1>

          <div className={styles.grid}>
            <Link href="/list">
              <a className={styles.card}>
                <h2>List</h2>
                <p>For check checkBox list</p>
              </a>
            </Link>

            <Link href="/connect">
              <a className={styles.card}>
                <h2>React-Query &rarr;</h2>
                <p>For check api connect</p>
              </a>
            </Link>

            <Link href="/validation">
              <a className={styles.card}>
                <h2>Validation &rarr;</h2>
                <p>For check react-hook-form</p>
              </a>
            </Link>

            <Link href="/pixi">
              <a className={styles.card}>
                <h2>Pixi</h2>
                <p>render canvas</p>
              </a>
            </Link>

            <Link href="/mui">
              <a className={styles.card}>
                <h2>MUI</h2>
                <p>check material ui</p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

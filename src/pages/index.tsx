import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>窓口</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Link</h1>

          <div className={styles.grid}>
            <Link href="/List">
              <a className={styles.card}>
                <h2>List</h2>
                <p>For check cjeckBox list</p>
              </a>
            </Link>

            <Link href="/Type">
              <a className={styles.card}>
                <h2>Type</h2>
                <p>For check typeScript</p>
              </a>
            </Link>

            <Link href="/Connect">
              <a className={styles.card}>
                <h2>React-Query &rarr;</h2>
                <p>For check api connect</p>
              </a>
            </Link>

            <Link href="/Validation">
              <a className={styles.card}>
                <h2>Validation &rarr;</h2>
                <p>For check react-hook-form</p>
              </a>
            </Link>

            <Link href="/Pixi">
              <a className={styles.card}>
                <h2>Pixi</h2>
                <p>render canvas</p>
              </a>
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <a rel="noopener noreferrer">
            Powered by{' '}
            <span className={styles.logo}>
              <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;

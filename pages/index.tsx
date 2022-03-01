import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
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
                <h2>Api &rarr;</h2>
                <p>For check api connect</p>
              </a>
            </Link>

            <Link href="/Validation">
              <a className={styles.card}>
                <h2>Validation &rarr;</h2>
                <p>
                  For check react-hook-form
                </p>
              </a>
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <a rel="noopener noreferrer">
            Powered by{' '}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;

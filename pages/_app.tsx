import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export const Context = createContext<{
  text: String;
  setText: Dispatch<SetStateAction<string>>;
}>({} as any);

const App = ({ Component, pageProps }: AppProps) => {
  const [text, setText] = useState('');
  const value = {
    text,
    setText,
  };

  return (
    <Context.Provider value={value}>
      <Component {...pageProps} />
    </Context.Provider>
  );
};

export default App;

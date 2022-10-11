import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface CanvasContextInterface {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  countDown: () => void;
}

// contextオブジェクトを作成 (初期値なし)
const CountContext = createContext({} as CanvasContextInterface);

// contextを返す custom hook
export const useCountContext = () => {
  return useContext(CountContext);
};

// 共有するコンテキストをセットして provider コンポーネントを返す関数
export const CountProvider = ({ children }: Props): JSX.Element => {
  const [count, setCount] = useState(0);

  const countDown = () => {
    setCount(count - 1);
  };

  const value = {
    count,
    setCount,
    countDown,
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

// use case: with components
// import { useCountContext } from '@/lib/contexts/CountContext';
// const { count, setCount, countDown } = useCountContext();

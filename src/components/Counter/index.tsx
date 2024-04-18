import { useCountContext } from '@/lib/contexts/CountContext';

export const Counter = () => {
  const { count, setCount } = useCountContext();

  const countUp = () => {
    setCount(count + 1);
    window.open('https://www.google.com/', '_blank');
  };

  return (
    <>
      <div>Count: {count}</div>
      <input type="button" onClick={() => countUp()} value={'+1'} />
    </>
  );
};

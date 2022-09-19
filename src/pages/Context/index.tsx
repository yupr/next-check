import { useCanvasContext } from 'src/lib/contexts/CountContext';

const ContextCheck = () => {
  const { count, setCount, countDown } = useCanvasContext();

  return (
    <div>
      <p>Context {count} </p>
      <input type="button" value="+1" onClick={() => setCount(count + 1)} />
      <input type="button" value="-1" onClick={countDown} />
    </div>
  );
};

export default ContextCheck;

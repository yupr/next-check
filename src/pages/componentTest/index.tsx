import Button from '@/components/atoms/Button';

const ComponentTest = () => {
  const login = () => {
    console.log('logined');
  };

  return (
    <div>
      <p>component</p>
      <Button className="button" onClick={login}>
        Button
      </Button>
    </div>
  );
};

export default ComponentTest;

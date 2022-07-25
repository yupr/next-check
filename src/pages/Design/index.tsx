import Button from '@/components/atoms/Button';

const Design = () => {
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

export default Design;

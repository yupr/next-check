import dynamic from 'next/dynamic';

const Confirm = () => {
  const ConfirmCanvas = dynamic(
    () => import('../../../components/ConfirmCanvas'),
    {
      ssr: false,
    }
  );
  return (
    <>
      <ConfirmCanvas />
    </>
  );
};

export default Confirm;

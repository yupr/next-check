import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';

const Inspect2 = () => {
  return <div>inspect2</div>;
};

const Inspect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStart = useCallback(
    (url: string) => {
      if (url !== router.pathname) {
        setIsLoading(true);
      }
    },
    [router]
  );

  useEffect(() => {
    // ルートが変更され始めると起動
    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [handleStart, router]);

  return (
    <>
      <div>inspect</div>
      {isLoading && <Inspect2 />}
    </>
  );
};

export default Inspect;

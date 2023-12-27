import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { css } from '@emotion/react';

const Sample1 = () => {
  const divRef = useRef(null);

  useEffect(() => {
    gsap.to(divRef.current, {
      backgroundImage: 'linear-gradient(to left, #09C6F9, #045DE9)',
      duration: 5,
    });
  }, [divRef]);

  return (
    <>
      <div
        ref={divRef}
        css={css({
          background: 'linear-gradient(to left, #9f92ff, #ff7689);',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
      >
        <h1>5秒かけてグラデーションの色が変化</h1>
      </div>
    </>
  );
};

export default Sample1;

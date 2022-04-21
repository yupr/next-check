import React from 'react';
import dynamic from 'next/dynamic';
// import './index.scss';

// create-next-appのdevコマンドで起動したアプリはSSRが有効になっている。
// クライアントのみでしか動作しないPixi.jsで動かなかったのはそれが理由。

const Pixi = () => {
  const Canvas = dynamic(() => import('../../components/Canvas'), {
    ssr: false,
  });

  return (
    <>
      <>
        <Canvas />
      </>
    </>
  );
};

export default Pixi;

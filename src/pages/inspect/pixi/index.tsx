import dynamic from 'next/dynamic';

// ここでいうssrとは、getServerSidePropsを使っているわけではなく、
// 文字通りサーバーサイド側であらかじめレンダリングされたことを意味する。
// つまり Next.js の標準の機能にあたるプリレンダリングによってビルド時に事前にhtmlの生成を行うため、
// 画面で使用されているコンポーネントがサーバーサイド側で実行されてしまう。
// そのため、クライアントのみでしか動作しないPixi.jsでビルド時にエラーが発生してしまったということ。

const Pixi = () => {
  const Canvas = dynamic(() => import('@/components/organisms/Canvas'), {
    ssr: false,
  });

  return <Canvas />;
};

export default Pixi;

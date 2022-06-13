import { useEffect, useRef, useState } from 'react';
import { LabelView } from '../lib/LabelView';
import { useRouter } from 'next/router';
import { useCanvasContext } from '../lib/contexts/CanvasContext';

let labelView: LabelView | null;

const Canvas = () => {
  const ref = useRef(null);
  const router = useRouter();
  const [name, setName] = useState('');
  const { setImageUrl } = useCanvasContext();

  useEffect(() => {
    labelView = new LabelView(ref.current, setImageUrl);

    return () => {
      if (labelView) {
        labelView.toDataURL();
        labelView.destroy();
        labelView = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (labelView) labelView.changeText(name);
  }, [name]);

  const onChangeName = (value: string) => {
    setName(value);
  };

  const handleNext = () => {
    router.push('/pixi/confirm');
  };

  return (
    <>
      <div className="canvas" ref={ref} />
      <img src="img/header-logo.png" alt="logo" />

      <div style={{ marginBottom: 30 }}>
        <p>名前入力</p>
        <input type="text" onChange={(e) => onChangeName(e.target.value)} />
      </div>

      <div>
        <input type="button" value="確認画面へ" onClick={handleNext} />
      </div>
    </>
  );
};

export default Canvas;

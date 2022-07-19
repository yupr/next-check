import { useEffect, useRef, useState } from 'react';
import { LabelView } from '../lib/LabelView';

let labelView: LabelView | null;

const Canvas = () => {
  const ref = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    labelView = new LabelView(ref.current);

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

  return (
    <>
      <div className="canvas" ref={ref} />
      <img src="img/header-logo.png" alt="logo" />

      <div style={{ marginBottom: 30 }}>
        <p>名前入力</p>
        <input type="text" onChange={(e) => onChangeName(e.target.value)} />
      </div>
    </>
  );
};

export default Canvas;

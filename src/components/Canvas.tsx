import React, { useEffect, useRef, useState } from 'react';
import LabelView from '@/lib/labelVIew';

let labelView: LabelView | null;

const Canvas = () => {
  const ref = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!ref.current) return;
    // const label = new LabelView(ref.current);
    labelView = new LabelView(ref.current);
    return () => {
      if (labelView) {
        labelView.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEffect(() => {
    if (labelView) labelView.changeText(name);
  }, [name]);

  const onChangeName = (value: string) => {
    setName(value);
  };

  return (
    <>
      <div className="canvas" ref={ref} />

      <div>
        <p>名前入力</p>
        <input type="text" onChange={(e) => onChangeName(e.target.value)} />
      </div>
    </>
  );
};

export default Canvas;

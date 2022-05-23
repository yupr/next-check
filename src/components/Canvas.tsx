import React, { useEffect, useRef, useState } from 'react';
import LabelView from '@/lib/labelVIew';

let labelView: LabelView | null;

const imageList = [{ src: 'img/cat.jpeg' }, { src: '/img/times_square.jpg' }];

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

  const select = (src: string) => {
    labelView?.select(src);
  };

  return (
    <>
      <div className="canvas" ref={ref} />

      <div>
        <p>名前入力</p>
        <input type="text" onChange={(e) => onChangeName(e.target.value)} />
      </div>

      <div className="canvas__select">
        <p> 画像選択</p>
        {imageList.map((data, index) => {
          return (
            <img
              key={index}
              src={data.src}
              width={100}
              height={50}
              alt="info"
              onClick={() => select(data.src)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Canvas;

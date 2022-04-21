import React, { useEffect } from 'react';
import LabelView from '@/lib/labelVIew';

const Canvas = () => {
  useEffect(() => {
    const data = new LabelView();
    data.canvas();
  }, []);

  return (
    <>
      <div className="canvas">{/* <div className="canvas__img" /> */}</div>
    </>
  );
};
export default Canvas;

import React, { useEffect } from 'react';
import ConfirmView from '@/lib/ConfirmView';
import { useCanvasContext } from '../lib/contexts/CanvasContext';

let confirmView: ConfirmView | null;

const ConfirmCanvas = () => {
  const { imageUrl } = useCanvasContext();

  useEffect(() => {
    console.log('labelImgUrl', imageUrl);
    confirmView = new ConfirmView();
    return () => {
      if (confirmView) {
        // console.log('confirm_cleanup');
        confirmView.destroy();
      }
    };
  }, [imageUrl]);

  return (
    <>
      <div>
        <p>confirm</p>
      </div>
    </>
  );
};

export default ConfirmCanvas;

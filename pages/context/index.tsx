import React, { useContext, useEffect } from 'react';
import { Context } from '../_app';

const ContextCheck = () => {
  const { text, setText } = useContext(Context);

  useEffect(() => {
    console.log('text', text);
    return () => {};
  }, [text]);

  const changeText = () => {
    setText('changed');
  };

  return (
    <div>
      <input type="button" onClick={changeText} value="change text" />
    </div>
  );
};

export default ContextCheck;

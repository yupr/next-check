import React, { useState, useCallback, memo } from 'react';

// memo, useCallback によるチューニング

// type
type ButtonProps = {
  handleClick: () => void;
  value: string;
};

type CountProps = {
  text: string;
  countState: number;
};

// Title
// propsを渡していないので、再レンダリングされない

// Count
// propsとして渡しているstateが更新された場合、該当のコンポーネントが再レンダリングされる

// Button
// memo化だけだと更新されないもう一方のButtonまで再レンダリングされる理由は？
// Buttonのいずれかをクリックした時、stateが更新されるため親が再レンダリングされる。
// Buttonコンポーネントにpropsとして関数を渡しているため、渡された関数は先ほどの親の再レンダリング時に再生成される。
// 再生成された関数を react.memo が別の関数と認識したため、useCallBackを用いて関数のキャッシュを行う必要がある。

const Title = memo(() => {
  console.log('Title component');
  return <h2>useCallBackTest vol.1</h2>;
});
Title.displayName = 'Title';

const Count: React.FC<CountProps> = memo(({ text, countState }: CountProps) => {
  console.log('Count child component', text, countState);
  return (
    <p>
      {text}:{countState}
    </p>
  );
});
Count.displayName = 'Count';

const Button: React.FC<ButtonProps> = memo(
  ({ handleClick, value }: ButtonProps) => {
    console.log('Button child component', value);
    return (
      <button type="button" onClick={handleClick}>
        {value}
      </button>
    );
  }
);
Button.displayName = 'Button';

const Memo = () => {
  const [firstCountState, setFirstCountState] = useState(0);
  const [secondCountState, setSecondCountState] = useState(10);

  const incrementFirstCounter = useCallback(() => {
    setFirstCountState(firstCountState + 1);
  }, [firstCountState]);

  const incrementSecondCounter = useCallback(() => {
    setSecondCountState(secondCountState + 10);
  }, [secondCountState]);

  return (
    <>
      <Title />
      <Count text="+ 1 ボタン" countState={firstCountState} />
      <Count text="+ 10 ボタン" countState={secondCountState} />
      <Button handleClick={incrementFirstCounter} value={'+1 ボタン'} />
      <Button handleClick={incrementSecondCounter} value={'+10 ボタン'} />
    </>
  );
};

export default Memo;

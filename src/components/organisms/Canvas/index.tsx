import { useEffect, useRef, useState } from 'react';
import { LabelView } from 'src/lib/LabelView';
import styles from './index.module.scss';
import { useLabelView } from '@/hooks/useLabel';

let labelView: LabelView | null;

const Canvas = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const { data: labelViewInfo } = useLabelView();

  useEffect(() => {
    if (!labelViewInfo) return;

    labelView = new LabelView(ref.current, labelViewInfo);

    return () => {
      if (labelView) {
        labelView.destroy();
      }
    };
  }, [labelViewInfo]);

  useEffect(() => {
    if (labelView) labelView.changeText(name);
  }, [name]);

  const onChangeName = (value: string) => {
    setName(value);
  };

  return (
    <>
      <div className={styles.pixi}>
        <div ref={ref} />
        <div className={styles.pixi__input}>
          <input
            type="text"
            placeholder="何か入力する"
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Canvas;

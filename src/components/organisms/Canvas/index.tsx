import { useEffect, useRef, useState } from 'react';
import { LabelView } from '@/lib/labelView';
import styles from './index.module.scss';
import { useLabelView } from '@/hooks/useLabel';

let labelView: LabelView | null;

const Canvas = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data: labelViewInfo } = useLabelView();
  const [isSetup, setSetup] = useState(false);

  useEffect(() => {
    labelView = new LabelView(ref.current, labelViewInfo);
    setSetup(!!labelView);

    return () => {
      if (labelView) {
        labelView.destroy();
      }
    };
  }, [labelViewInfo]);

  const onChangeName = (value: string) => {
    labelView?.changeText(value);
  };

  return (
    <>
      <div className={styles.pixi}>
        <div ref={ref} />
        {isSetup && (
          <div className={styles.pixi__input}>
            <input
              type="text"
              placeholder="何か入力する"
              onChange={(e) => onChangeName(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Canvas;

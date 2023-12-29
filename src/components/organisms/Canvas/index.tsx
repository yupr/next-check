import { useEffect } from 'react';
import { LabelView } from '@/lib/labelView';
import styles from './index.module.scss';
import { useLabelView } from '@/hooks/useLabel';

let labelView: LabelView | null;

const Canvas = () => {
  const { data: labelViewInfo } = useLabelView();

  useEffect(() => {
    if (labelViewInfo) {
      labelView = new LabelView(labelViewInfo);
    }

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
        <div id="canvas" />

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

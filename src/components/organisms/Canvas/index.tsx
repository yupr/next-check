import { useEffect } from 'react';
import { LabelView } from '@/lib/labelView';
import { useLabelView } from '@/hooks/useLabel';
import { css } from '@emotion/react';

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
      <div css={css({ width: '600px' })}>
        <div id="canvas" />

        <div>
          <input
            type="text"
            placeholder="何か入力する"
            css={css({
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            })}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Canvas;

import { render, screen, fireEvent } from '@testing-library/react';
import { BasicModal } from '@/components/organisms/BasicModal';
import '@testing-library/jest-dom';

describe('BasicModal', () => {
  test('モーダルが表示される。', () => {
    render(<BasicModal title="タイトル" message="メッセージ" />);

    const handleCloseText = screen.getByText('閉じる');
    expect(handleCloseText).toBeInTheDocument();
  });

  test('閉じるボタンを押下してモーダルを閉じることができる。', () => {
    render(<BasicModal title="タイトル" message="メッセージ" />);

    const handleCloseButton = screen.queryByText('閉じる');
    if (handleCloseButton) {
      fireEvent.click(handleCloseButton);
    }
    expect(handleCloseButton).not.toBeInTheDocument();
  });
});

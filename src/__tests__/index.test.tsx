import { render, screen, fireEvent } from '@testing-library/react';
import { BasicModal } from '@/components/organisms/BasicModal';
import '@testing-library/jest-dom';

// next/router をモック化
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '111111',
    };
  },
}));

describe('BasicModal', () => {
  test('モーダルが表示される。', () => {
    render(<BasicModal />);

    const handleCloseText = screen.getByText('閉じる');
    expect(handleCloseText).toBeInTheDocument();
  });

  test('Propsがレンダリングされる。', () => {
    render(<BasicModal title="タイトル" message="メッセージ" />);

    const title = screen.getByText('タイトル');
    const message = screen.getByText('メッセージ');

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  test('閉じるボタンを押下してモーダルを閉じることができる。', () => {
    render(<BasicModal title="タイトル" message="メッセージ" />);

    const handleCloseButton = screen.queryByText('閉じる');
    if (handleCloseButton) {
      fireEvent.click(handleCloseButton);
    }

    // NOTE: 該当の要素が取得できないということはモーダルが閉じたことを意味する。
    expect(handleCloseButton).not.toBeInTheDocument();
  });
});

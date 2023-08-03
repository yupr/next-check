import { render, screen, fireEvent } from '@testing-library/react';
import { BasicModal } from '@/components/organisms/BasicModal';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
// import Inspect from '@/pages/inspect';
import i18n from '@/i18n/locales';
// import mockRouter from 'next-router-mock';

// jest.mock('next/router', () => require('next-router-mock'));

describe('BasicModal', () => {
  test('モーダルが表示される。', () => {
    render(
      // NOTE: 1度、I18nextProviderでwrapperしていればそれ以降のテストでも多言語化のテストが可能。
      <I18nextProvider i18n={i18n}>
        <BasicModal title="タイトル" />
      </I18nextProvider>
    );
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

    const handleCloseButton = screen.getByText('閉じる');
    if (handleCloseButton) {
      fireEvent.click(handleCloseButton);
    }

    // NOTE: 該当の要素が取得できないということはモーダルが閉じたことを意味する。
    expect(handleCloseButton).not.toBeInTheDocument();
  });
});

/**
 *  コンポーネントのマウント後に、route の変更でstateが更新された後、
 *  更新後のstateを元にコンポーネントがレンダリングされたかどうかの確認するためのテストケース。
 */
// describe('Inspect', () => {
//   test('ルートが変わった場合、Inspect2コンポーネントが表示される。', async () => {
//     render(<Inspect />);

//     await waitFor(() => mockRouter.setCurrentUrl('/validation'));
//     expect(screen.getByText('inspect2')).toBeInTheDocument();
//   });
// });

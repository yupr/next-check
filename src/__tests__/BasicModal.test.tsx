import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { BasicModal } from '@/components/organisms/BasicModal';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/locales';

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

test('Propsで渡した値が表示される。', () => {
  render(<BasicModal title="タイトル" message="メッセージ" />);

  const title = screen.getByText('タイトル');
  const message = screen.getByText('メッセージ');

  expect(title).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});

test('閉じるボタンを押下してモーダルを閉じることができる。', async () => {
  render(<BasicModal title="タイトル" message="メッセージ" />);

  const handleCloseButton = screen.getByText('閉じる');

  await waitFor(() => {
    userEvent.click(handleCloseButton);
  });

  // NOTE: 該当の要素が取得できないということはモーダルが閉じたことを意味する。
  expect(handleCloseButton).not.toBeInTheDocument();
});

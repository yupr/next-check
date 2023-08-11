import { render, screen, waitFor } from '@testing-library/react';
import { Counter } from '@/components/organisms/Counter';
import '@testing-library/jest-dom';
import { CountProvider } from '@/lib/contexts/CountContext';
import { FunctionComponent, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';

type Props = {
  children: ReactElement;
};

test('Counter', async () => {
  const wrapper: FunctionComponent<Props> = ({ children }) => (
    <CountProvider>{children}</CountProvider>
  );

  window.open = jest.fn();

  render(<Counter />, { wrapper });

  const handleCountText = screen.getByText('+1');
  userEvent.click(handleCountText);

  await waitFor(() => {
    const countNum = screen.getByText('Count: 1');
    expect(countNum).toBeInTheDocument();
  });
});

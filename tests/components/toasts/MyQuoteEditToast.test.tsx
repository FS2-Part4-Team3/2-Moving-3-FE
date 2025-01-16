import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import MyQuoteEditToast from '@/components/toasts/MyQuoteEditToast';

jest.useFakeTimers();

describe('MyQuoteEditToast', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('renders correctly with all elements', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    const infoImage = screen.getByAltText('info');
    expect(infoImage).toBeInTheDocument();
    expect(infoImage).toHaveAttribute('src');

    const message = screen.getByText(/견적을 보낸 기사님이 있어서/i);
    expect(message).toBeInTheDocument();
  });

  it('calls onClose after 10 seconds', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    expect(mockOnClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<MyQuoteEditToast onClose={mockOnClose} />);

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});

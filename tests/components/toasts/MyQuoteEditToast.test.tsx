import { render, screen, act } from '@testing-library/react';
import MyQuoteEditToast from '@/components/toasts/MyQuoteEditToast';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('MyQuoteEditToast', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('renders correctly with all elements', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    // Check if the info image exists
    const infoImage = screen.getByAltText('info');
    expect(infoImage).toBeInTheDocument();
    expect(infoImage).toHaveAttribute('src');

    // Check if the text content exists
    const message = screen.getByText(/견적을 보낸 기사님이 있어서/i);
    expect(message).toBeInTheDocument();
  });

  it('calls onClose after 10 seconds', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    // Verify onClose hasn't been called initially
    expect(mockOnClose).not.toHaveBeenCalled();

    // Fast-forward 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Verify onClose has been called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<MyQuoteEditToast onClose={mockOnClose} />);

    // Create spy for clearTimeout
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    // Unmount the component
    unmount();

    // Verify clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it('has correct styling classes', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    const container = screen.getByRole('generic');
    expect(container).toHaveClass(
      'fixed',
      'bottom-[3.5rem]',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'rounded-[1.2rem]',
      'border',
      'border-red-200',
      'flex',
      'items-center',
      'bg-red-100'
    );
  });

  it('renders responsive styling classes', () => {
    render(<MyQuoteEditToast onClose={mockOnClose} />);

    const container = screen.getByRole('generic');
    
    // Check responsive width classes
    expect(container).toHaveClass('lg:w-[120rem]', 'md:w-[60rem]', 'sm:w-[32.7rem]');
    
    // Check responsive padding classes
    expect(container).toHaveClass('lg:py-[2.4rem]', 'lg:px-[3.2rem]', 'sm:py-[1rem]', 'sm:px-[2.4rem]');
    
    // Check responsive gap classes
    expect(container).toHaveClass('lg:gap-[1.6rem]', 'sm:gap-[0.8rem]');
  });
});
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ModalWrapper } from '@/components/common/headless/Modal';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('ModalWrapper', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('render modal with all its parts', () => {
    render(
      <ModalWrapper onClose={mockOnClose}>
        <ModalWrapper.Header>Test Header</ModalWrapper.Header>
        <ModalWrapper.Content>Test Content</ModalWrapper.Content>
        <ModalWrapper.Footer isDisabled={false}>Test Footer</ModalWrapper.Footer>
      </ModalWrapper>,
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('call onClose when close button is clicked', () => {
    render(
      <ModalWrapper onClose={mockOnClose}>
        <ModalWrapper.Header>Test Header</ModalWrapper.Header>
      </ModalWrapper>,
    );

    const closeButtons = screen.getAllByAltText('close');
    fireEvent.click(closeButtons[0]);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handle footer button click', () => {
    render(
      <ModalWrapper onClose={mockOnClose}>
        <ModalWrapper.Footer isDisabled={false}>Click me</ModalWrapper.Footer>
      </ModalWrapper>,
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('disable footer button', () => {
    render(
      <ModalWrapper onClose={mockOnClose}>
        <ModalWrapper.Footer isDisabled={true}>Disabled button</ModalWrapper.Footer>
      </ModalWrapper>,
    );

    const button = screen.getByText('Disabled button');
    expect(button).toBeDisabled();
  });

  it('apply custom className to modal wrapper', () => {
    const customClass = 'custom-modal-class';
    render(
      <ModalWrapper onClose={mockOnClose} className={customClass}>
        <ModalWrapper.Content>Test Content</ModalWrapper.Content>
      </ModalWrapper>,
    );

    const modalDiv = screen.getByText('Test Content').parentElement;
    expect(modalDiv).toHaveClass(customClass);
  });

  it('throw error when using context outside ModalWrapper', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ModalWrapper.Header>Test Header</ModalWrapper.Header>);
    }).toThrow('useModalContext must be used within a ModalWrapper');

    consoleError.mockRestore();
  });

  it('render desktop and mobile close button with correct size', () => {
    render(
      <ModalWrapper onClose={mockOnClose}>
        <ModalWrapper.Header>Test Header</ModalWrapper.Header>
      </ModalWrapper>,
    );

    const closeButtons = screen.getAllByAltText('close');
    expect(closeButtons).toHaveLength(2);

    expect(closeButtons[0]).toHaveAttribute('width', '36');
    expect(closeButtons[0]).toHaveAttribute('height', '36');

    expect(closeButtons[1]).toHaveAttribute('width', '24');
    expect(closeButtons[1]).toHaveAttribute('height', '24');
  });
});

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
});

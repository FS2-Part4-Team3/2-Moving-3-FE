import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonWrapper } from '@/components/common/headless/Button';

describe('Button wrapper and Button components', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('render Button Wrapper with Button correctly', () => {
    render(
      <ButtonWrapper id="test-button" onClick={mockOnClick}>
        <ButtonWrapper.Button>Click me</ButtonWrapper.Button>
      </ButtonWrapper>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('call onClick handler when button is clicked', () => {
    render(
      <ButtonWrapper id="test-button" onClick={mockOnClick}>
        <ButtonWrapper.Button>Click me</ButtonWrapper.Button>
      </ButtonWrapper>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('respect disabled state', () => {
    render(
      <ButtonWrapper id="test-button" onClick={mockOnClick}>
        <ButtonWrapper.Button disabled>Click me</ButtonWrapper.Button>
      </ButtonWrapper>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-button-class';
    render(
      <ButtonWrapper id="test-button" onClick={mockOnClick}>
        <ButtonWrapper.Button className={customClass}>Click me</ButtonWrapper.Button>
      </ButtonWrapper>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(customClass);
  });

  it('throw error when button is used outside button wrapper', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(<ButtonWrapper.Button>Click me</ButtonWrapper.Button>);
    }).toThrow('useButtonContest must be used within a Button Wrapper');

    consoleSpy.mockRestore();
  });
});

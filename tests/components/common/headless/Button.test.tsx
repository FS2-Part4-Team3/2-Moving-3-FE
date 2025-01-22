import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ButtonWrapper } from '@/components/common/headless/Button';

describe('Button wrapper and Button components', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('render Button Wrapper with Button correctly', () => {
    render(
      <ButtonWrapper id="test-button" onClick={mockOnClick} type="button">
        <ButtonWrapper.Button>Click me</ButtonWrapper.Button>
      </ButtonWrapper>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
});

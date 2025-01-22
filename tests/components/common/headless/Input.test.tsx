import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InputWrapper } from '@/components/common/headless/Input';

describe('InputWrapper and Components', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('render Input and Label correctly', () => {
    render(
      <InputWrapper id="test-input" value="" onChange={mockOnChange}>
        <InputWrapper.Label>Test Label</InputWrapper.Label>
        <InputWrapper.Input />
      </InputWrapper>,
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test Label');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});

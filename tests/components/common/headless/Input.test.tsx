import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('handles onChange events properly', () => {
    render(
      <InputWrapper id="test-input" value="" onChange={mockOnChange}>
        <InputWrapper.Input />
      </InputWrapper>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className correctly', () => {
    const inputClass = 'custom-input';
    const labelClass = 'custom-label';

    render(
      <InputWrapper id="test-input" value="" onChange={mockOnChange}>
        <InputWrapper.Label className={labelClass}>Test Label</InputWrapper.Label>
        <InputWrapper.Input className={inputClass} />
      </InputWrapper>,
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test Label');

    expect(input).toHaveClass(inputClass);
    expect(label).toHaveClass(labelClass);
  });

  it('throws error when Input is used outside', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(<InputWrapper.Input />);
    }).toThrow('useInputContext must be used within an InputWrapper');

    consoleSpy.mockRestore();
  });
});

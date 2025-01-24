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

  it('throw error when Input is used outside', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(<InputWrapper.Input />);
    }).toThrow('useInputContext must be used within an InputWrapper');

    consoleSpy.mockRestore();
  });

  it('handle different input types correctly', () => {
    const { container } = render(
      <InputWrapper id="test-input" value="" onChange={mockOnChange} type="password">
        <InputWrapper.Input />
      </InputWrapper>,
    );

    const input = container.querySelector('#test-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('pass additional props correctly', () => {
    render(
      <InputWrapper id="test-input" value="" onChange={mockOnChange}>
        <InputWrapper.Input placeholder="Enter text" maxLength={10} />
      </InputWrapper>,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});

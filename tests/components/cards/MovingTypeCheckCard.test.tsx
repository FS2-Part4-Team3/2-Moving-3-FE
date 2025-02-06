import { fireEvent, render, screen } from '@testing-library/react';
import MovingTypeCheckCard from '@/components/cards/MovingTypeCheckCard';
import movingTypesCheck from '@/constants/movingTypeCheckCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => {
    return <img src={src.src || src} alt={alt} {...props} />;
  },
}));

describe('MovingTypeCheckCard', () => {
  const mockSetMovingType = jest.fn();
  const mockSetIsMovingType = jest.fn();
  const mockSetViewMovingType = jest.fn();

  const defaultProps = {
    setMovingType: mockSetMovingType,
    setIsMovingType: mockSetIsMovingType,
    initialMovingType: '',
    setViewMovingType: mockSetViewMovingType,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays all moving types on initial render', () => {
    render(<MovingTypeCheckCard {...defaultProps} />);

    movingTypesCheck.forEach(type => {
      expect(screen.getByText(type.type)).toBeInTheDocument();
    });
  });

  it('updates style and state when a moving type is selected', () => {
    render(<MovingTypeCheckCard {...defaultProps} />);

    const firstType = movingTypesCheck[0];
    const typeElement = screen.getByText(firstType.type);
    const typeContainer = typeElement.closest('div');

    fireEvent.click(typeContainer!);

    expect(typeContainer).toHaveClass('border-blue-300');
    expect(typeContainer).toHaveClass('bg-blue-50');
    expect(mockSetViewMovingType).toHaveBeenCalledWith(firstType.type);
  });

  it('displays the initial moving type as selected if provided', () => {
    const initialType = movingTypesCheck[0].code;
    render(<MovingTypeCheckCard {...defaultProps} initialMovingType={initialType} />);

    const selectedTypeContainer = screen.getByText(movingTypesCheck[0].type).closest('div');

    expect(selectedTypeContainer).toHaveClass('border-blue-300');
    expect(selectedTypeContainer).toHaveClass('bg-blue-50');
    expect(mockSetIsMovingType).toHaveBeenCalled();
  });

  it('disables the complete selection button when no moving type is selected', () => {
    render(<MovingTypeCheckCard {...defaultProps} />);

    const completeButton = screen.getByText('선택완료');
    fireEvent.click(completeButton);

    expect(completeButton).toBeDisabled();
    expect(mockSetMovingType).not.toHaveBeenCalled();
    expect(mockSetIsMovingType).not.toHaveBeenCalled();
  });

  it('calls the appropriate callbacks when a moving type is selected and the complete button is clicked', () => {
    render(<MovingTypeCheckCard {...defaultProps} />);

    const firstType = movingTypesCheck[0];
    const typeElement = screen.getByText(firstType.type);
    fireEvent.click(typeElement);

    expect(screen.getByText(firstType.type).closest('div')).toHaveClass('border-blue-300');

    const completeButton = screen.getByText('선택완료');
    fireEvent.click(completeButton);

    expect(mockSetMovingType).toHaveBeenCalledWith(firstType.code);
    expect(mockSetIsMovingType).toHaveBeenCalledWith(true);
  });
});

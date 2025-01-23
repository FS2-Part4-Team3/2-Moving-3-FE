import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import CalendarCard from '@/components/cards/CalendarCard';
import { CalendarCardProps } from '@/interfaces/Card/CalendarCardInterface';

// Mocking ButtonWrapper
jest.mock('@/components/common/headless/Button', () => {
  const MockButtonWrapper = ({ children, id }: { children: ReactNode; id: string }) => <div data-testid={id}>{children}</div>;

  MockButtonWrapper.Button = ({
    children,
    onClick,
    disabled,
    className,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <button data-testid="calendar-button" onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );

  return {
    ButtonWrapper: MockButtonWrapper,
  };
});

describe('Calendar comp', () => {
  const mockSetMovingDate = jest.fn();
  const mockSetIsMovingDate = jest.fn();
  const initialMovingDate = new Date('2025-01-23');

  const defaultProps: CalendarCardProps = {
    setMovingDate: mockSetMovingDate,
    setIsMovingDate: mockSetIsMovingDate,
    initialMovingDate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-23'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('render CalendarCard', () => {
    render(<CalendarCard {...defaultProps} />);

    expect(screen.getByText('2025.01')).toBeInTheDocument();
    expect(screen.getByText('선택완료')).toBeInTheDocument();
  });

  it('move to the previous month', () => {
    render(<CalendarCard {...defaultProps} />);

    const prevBtn = screen.getByAltText('이전 달');
    fireEvent.click(prevBtn);

    expect(screen.getByText('2024.12')).toBeInTheDocument();
  });

  it('move to the next month', () => {
    render(<CalendarCard {...defaultProps} />);

    const nextBtn = screen.getByAltText('다음 달');
    fireEvent.click(nextBtn);

    expect(screen.getByText('2025.02')).toBeInTheDocument();
  });

  it('select a date', () => {
    render(<CalendarCard {...defaultProps} />);

    const dateElement = screen.getByText('20');
    fireEvent.click(dateElement);

    const selectBtn = screen.getByText('선택완료');
    fireEvent.click(selectBtn);

    expect(mockSetIsMovingDate).toHaveBeenCalledWith(expect.any(Date));
    expect(mockSetIsMovingDate).toHaveBeenCalledWith(true);
  });

  it('now allow selecting past date', () => {
    jest.setSystemTime(new Date('2025-01-15'));
    render(<CalendarCard {...defaultProps} />);

    const pastDate = screen.getByText('1');
    fireEvent.click(pastDate);

    const selectBtn = screen.getByText('선택완료');
    fireEvent.click(selectBtn);

    expect(mockSetMovingDate).not.toHaveBeenCalledWith(expect.any(Date));
  });

  it('display weekdays', () => {
    render(<CalendarCard {...defaultProps} />);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});

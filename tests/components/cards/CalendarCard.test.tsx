import { fireEvent, render, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import * as FormatUtils from '@/utils/Format';
import CalendarCard from '@/components/cards/CalendarCard';
import { CalendarCardProps } from '@/interfaces/Card/CalendarCardInterface';

// Mock the ButtonWrapper completely
jest.mock('@/components/common/headless/Button', () => {
  const MockButtonWrapper = ({ children, id }: { children: ReactNode; id: string }) => <div data-testid={id}>{children}</div>;

  MockButtonWrapper.Button = ({
    children,
    onClick,
    disabled = false,
    className,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <button data-testid="calendar-button" onClick={disabled ? undefined : onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );

  return {
    ButtonWrapper: MockButtonWrapper,
  };
});

// Mock getDaysInMonth
jest.mock('@/utils/Format', () => ({
  getDaysInMonth: jest.fn(),
}));

describe('CalendarCard', () => {
  const mockSetMovingDate = jest.fn();
  const mockSetIsMovingDate = jest.fn();
  const initialMovingDate = new Date('2025-01-23');

  const defaultProps: CalendarCardProps = {
    setMovingDate: mockSetMovingDate,
    setIsMovingDate: mockSetIsMovingDate,
    initialMovingDate,
  };

  const createMockDays = (currentMonth = true) => [
    { date: 29, isCurrentMonth: false },
    { date: 30, isCurrentMonth: false },
    { date: 31, isCurrentMonth: false },

    { date: 1, isCurrentMonth: currentMonth },
    { date: 2, isCurrentMonth: currentMonth },
    { date: 16, isCurrentMonth: currentMonth },
    { date: 17, isCurrentMonth: currentMonth },
    { date: 18, isCurrentMonth: currentMonth },
    { date: 23, isCurrentMonth: currentMonth },

    { date: 1, isCurrentMonth: false },
    { date: 2, isCurrentMonth: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-15'));

    // Default mock implementation
    (FormatUtils.getDaysInMonth as jest.Mock).mockReturnValue(createMockDays());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the calendar with correct month and year', () => {
    render(<CalendarCard {...defaultProps} />);
    expect(screen.getByText('2025.01')).toBeInTheDocument();
  });

  it('navigates to previous month', () => {
    render(<CalendarCard {...defaultProps} />);
    const prevButton = screen.getByAltText('이전 달');

    (FormatUtils.getDaysInMonth as jest.Mock).mockReturnValueOnce(createMockDays(false));

    fireEvent.click(prevButton);
    expect(screen.getByText('2024.12')).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<CalendarCard {...defaultProps} />);
    const nextButton = screen.getByAltText('다음 달');

    (FormatUtils.getDaysInMonth as jest.Mock).mockReturnValueOnce(createMockDays(false));

    fireEvent.click(nextButton);
    expect(screen.getByText('2025.02')).toBeInTheDocument();
  });

  it('selects initial date by default', () => {
    render(<CalendarCard {...defaultProps} />);

    const initialDateElement = screen.getByText('23');

    expect(initialDateElement.classList.contains('bg-blue-300')).toBeTruthy();
  });

  it('prevents selecting past dates', () => {
    const initialMovingDate = new Date('2025-01-01');
    const previousProps: CalendarCardProps = {
      ...defaultProps,
      initialMovingDate,
    };
    render(<CalendarCard {...previousProps} />);

    const pastDateElements = screen.getAllByText('1');
    fireEvent.click(pastDateElements[0]);

    const completeButton = screen.getByText('선택완료');
    fireEvent.click(completeButton);

    expect(mockSetMovingDate).not.toHaveBeenCalled();
    expect(mockSetIsMovingDate).not.toHaveBeenCalled();
  });

  it('allows selecting future dates', () => {
    render(<CalendarCard {...defaultProps} />);

    const futureDateElement = screen.getByText('16');
    fireEvent.click(futureDateElement);

    const completeButton = screen.getByText('선택완료');
    fireEvent.click(completeButton);

    expect(mockSetMovingDate).toHaveBeenCalledWith(expect.any(Date));
    expect(mockSetIsMovingDate).toHaveBeenCalledWith(true);
  });

  it('displays all weekdays', () => {
    render(<CalendarCard {...defaultProps} />);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});

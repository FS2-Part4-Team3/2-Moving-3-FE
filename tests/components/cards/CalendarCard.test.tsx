import { render, screen } from '@testing-library/react';
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
  const initialMovingDate = new Date('2024-01-23');

  const defaultProps: CalendarCardProps = {
    setMovingDate: mockSetMovingDate,
    setIsMovingDate: mockSetIsMovingDate,
    initialMovingDate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-23'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('render CalendarCard', () => {
    render(<CalendarCard {...defaultProps} />);

    expect(screen.getByText('2024.01')).toBeInTheDocument();
    expect(screen.getByText('선택완료')).toBeInTheDocument();
  });
});

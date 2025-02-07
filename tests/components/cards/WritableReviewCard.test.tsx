import { render, screen } from '@testing-library/react';
import WritableReviewCard from '@/components/cards/WritableReviewCard';
import { EstimationItem } from '@/interfaces/Card/NormalReviewCardInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';

//Mock the next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

//Mock child components
jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => <div data-testid={`moving-type-chip-${type}`}>{type}</div>,
}));

jest.mock('@/components/modal/WritingReviewModal', () => ({
  __esModule: true,
  default: ({ estimation, setIsModalOpen }: { estimation: EstimationItem; setIsModalOpen: (isOpen: boolean) => void }) => (
    <div data-testid="writing-review-modal">
      Modal Content
      <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
    </div>
  ),
}));

//Mock utility functions
jest.mock('@/utils/Format', () => ({
  DateWithoutDayWeeKFormat: jest.fn(),
  priceFormat: jest.fn(),
}));

describe('WritableReviewCard', () => {
  const mockEstimation: EstimationItem = {
    estimationInfo: {
      estimationId: '123',
      price: 150000,
    },
    moveInfo: {
      serviceType: 'SMALL',
      date: '2024-02-06',
    },
    designatedRequest: 'Active',
    driver: {
      name: '홍길동',
      image: '/driver-image.jpg',
    },
  };

  beforeEach(() => {
    (DateWithoutDayWeeKFormat as jest.Mock).mockImplementation((date: string) => '2024년 2월 6일');
    (priceFormat as jest.Mock).mockImplementation((price: number) => '150,000');
  });

  it('renders basic component', () => {
    render(<WritableReviewCard estimation={mockEstimation} />);

    expect(screen.getByText(/홍길동 기사님/)).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-SMALL')).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-APPOINTMENT')).toBeInTheDocument();
  });

  it('displays formatted date and price', () => {
    render(<WritableReviewCard estimation={mockEstimation} />);

    expect(screen.getByText('2024년 2월 6일')).toBeInTheDocument();
    expect(screen.getByText('150,000원')).toBeInTheDocument();
    expect(DateWithoutDayWeeKFormat).toHaveBeenCalledWith(mockEstimation.moveInfo.date);
    expect(priceFormat).toHaveBeenCalledWith(mockEstimation.estimationInfo.price);
  });
});

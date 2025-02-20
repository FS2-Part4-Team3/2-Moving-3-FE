import { render, screen } from '@testing-library/react';
import WrittenReviewCard from '@/components/cards/WrittenReviewCard';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';

// next/image mocking
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const imgProps = { ...props };
    delete imgProps.fill;
    return <img {...imgProps} />;
  },
}));

// MovingTypeChips mocking
jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => <div data-testid={`moving-type-chip-${type}`}>{type}</div>,
}));

// Format mocking
jest.mock('@/utils/Format', () => ({
  DateWithoutDayWeeKFormat: jest.fn(() => '2024.02.10'),
  priceFormat: jest.fn(() => '150,000'),
}));

const mockReview = {
  id: '1',
  score: 4,
  createdAt: '2024-02-06T09:00:00.000Z',
  comment: '친절하고 좋았습니다.',
  driver: {
    name: '김운전',
    image: '/driver-image.jpg',
  },
  estimation: {
    price: 150000,
    moveInfos: {
      date: '2024-02-10T09:00:00.000Z',
      serviceType: 'HOME',
      isSpecificRequest: true,
    },
  },
} as const;

describe('WrittenReviewCard', () => {
  it('renders basic review information correctly', () => {
    render(<WrittenReviewCard myReview={mockReview} />);

    expect(screen.getByText(/김운전 기사님/)).toBeInTheDocument();
    expect(screen.getByAltText('김운전')).toBeInTheDocument();

    expect(screen.getByText('친절하고 좋았습니다.')).toBeInTheDocument();
    expect(screen.getByText('150,000원')).toBeInTheDocument();

    expect(screen.getByTestId('moving-type-chip-HOME')).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-APPOINTMENT')).toBeInTheDocument();

    expect(screen.getAllByText('2024.02.10')).toBeTruthy();
  });

  it('renders correct number of stars based on score', () => {
    render(<WrittenReviewCard myReview={mockReview} />);

    const stars = screen.getAllByAltText('star');
    expect(stars).toHaveLength(5);

    stars.forEach((star, index) => {
      if (index < mockReview.score) {
        expect(star).toHaveAttribute('data-startype', 'yellow');
      } else {
        expect(star).toHaveAttribute('data-startype', 'gray');
      }
    });
  });
});

import { render, screen } from '@testing-library/react';
import WrittenReviewCard from '@/components/cards/WrittenReviewCard';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';

// SVG mocking
jest.mock('@/../public/assets/driver/ic_star_yellow.svg', () => '/star_yellow.svg');
jest.mock('@/../public/assets/driver/ic_star_gray.svg', () => '/star_gray.svg');

// next/image mocking
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    let actualSrc = src;
    if (typeof src === 'object') {
      if (src.default && src.default.includes('star_yellow')) {
        actualSrc = '/star_yellow.svg';
      } else if (src.default && src.default.includes('star_gray')) {
        actualSrc = '/star_gray.svg';
      } else {
        actualSrc = src.default || src;
      }
    }

    return <img src={actualSrc} alt={alt} {...props} data-testid={alt === 'star' ? 'star-image' : 'mocked-image'} />;
  },
}));

// MovingTypeChips mocking
jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => <div data-testid={`moving-type-chip-${type}`}>{type}</div>,
}));

// Format mocking
jest.mock('@/utils/Format', () => ({
  DateWithoutDayWeeKFormat: jest.fn(() => '2024년 2월 10일'),
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
  it('renders basic review', () => {
    render(<WrittenReviewCard myReview={mockReview} />);

    const driverImage = screen.getByAltText(mockReview.driver.name);
    expect(driverImage).toBeInTheDocument();

    const stars = screen.getAllByTestId('star-image');
    console.log(
      'Rendered stars:',
      stars.map(star => ({
        src: star.getAttribute('src'),
        alt: star.getAttribute('alt'),
      })),
    );

    const yellowStars = stars.filter(star => star.getAttribute('src') === '/star_yellow.svg');
    const grayStars = stars.filter(star => star.getAttribute('src') === '/star_gray.svg');

    expect(yellowStars).toHaveLength(4);
    expect(grayStars).toHaveLength(1);

    expect(screen.getByText(/김운전 기사님/)).toBeInTheDocument();
    expect(screen.getByText('친절하고 좋았습니다.')).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-HOME')).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-APPOINTMENT')).toBeInTheDocument();
  });
});

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import WritingReviewModal from '@/components/modal/WritingReviewModal';

// Mock the external dependencies
jest.mock('@/api/ReviewService', () => ({
  postReviewData: jest.fn(),
}));

// Mock the Format utility functions
jest.mock('@/utils/Format', () => ({
  DateWithoutDayWeeKFormat: jest.fn().mockReturnValue('2024.02.06'),
  priceFormat: jest.fn().mockReturnValue('150,000'),
}));

// Mock the star images
jest.mock('@/../public/assets/driver/ic_star_gray.svg', () => '/star-gray.svg');
jest.mock('@/../public/assets/driver/ic_star_yellow.svg', () => '/star-yellow.svg');

jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: () => <div data-testid="moving-type-chip">이사 유형</div>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, onClick }: any) => {
    const dataTestId = alt === 'star' ? { 'data-testid': 'star-rating' } : {};
    return <img src={src} alt={alt} onClick={onClick} {...dataTestId} />;
  },
}));

// Mock data
const mockEstimation = {
  driver: {
    image: '/mock-image.jpg',
    name: '홍길동',
  },
  moveInfo: {
    date: '2024-02-06T00:00:00.000Z',
    serviceType: 'SMALL',
  },
  estimationInfo: {
    estimationId: 'asd123123',
    price: 150000,
  },
  designatedRequest: 'Inactive',
} as const;

describe('WritingReviewModal', () => {
  const mockSetIsModalOpen = jest.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <WritingReviewModal estimation={mockEstimation} setIsModalOpen={mockSetIsModalOpen} />
      </QueryClientProvider>,
    );
  };

  it('renders modal with initial state', () => {
    renderComponent();

    expect(screen.getByText('리뷰 쓰기')).toBeInTheDocument();
    expect(screen.getByText(/홍길동 기사님/)).toBeInTheDocument();
    expect(screen.getByText('150,000원')).toBeInTheDocument();

    const submitButton = screen.getByText('리뷰 등록');
    expect(submitButton).toBeDisabled();

    const starImages = screen.getAllByTestId('star-rating');
    expect(starImages).toHaveLength(5);
    starImages.forEach(star => {
      expect(star.getAttribute('src')).toBe('/star-gray.svg');
    });
  });

  it('enables submit button when valid input is provided', () => {
    renderComponent();

    const starImages = screen.getAllByTestId('star-rating');
    fireEvent.click(starImages[4]);

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '이사 서비스가 매우 만족스러웠습니다!' } });

    const submitButton = screen.getByText('리뷰 등록');
    expect(submitButton).not.toBeDisabled();
  });

  it('handles star rating selection correctly', () => {
    renderComponent();

    const starImages = screen.getAllByTestId('star-rating');
    fireEvent.click(starImages[2]);

    const updatedStars = screen.getAllByTestId('star-rating');

    updatedStars.slice(0, 3).forEach(star => {
      expect(star.getAttribute('src')).toBe('/star-yellow.svg');
    });

    updatedStars.slice(3).forEach(star => {
      expect(star.getAttribute('src')).toBe('/star-gray.svg');
    });
  });
});

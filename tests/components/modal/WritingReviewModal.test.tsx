import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { postReviewData } from '@/api/ReviewService';
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

const mockAlert = jest.fn();
window.alert = mockAlert;

// Mock the star images
const STAR_GRAY = '/star-gray.svg';
const STAR_YELLOW = '/star-yellow.svg';

jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: () => <div data-testid="moving-type-chip">이사 유형</div>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, onClick, 'data-startType': dataStarType }: any) => {
    const dataTestId = alt === 'star' ? { 'data-testid': 'star-rating' } : {};
    return (
      <img
        src={dataStarType === 'yellow' ? STAR_YELLOW : dataStarType === 'gray' ? STAR_GRAY : src}
        alt={alt}
        onClick={onClick}
        {...dataTestId}
      />
    );
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

  it('keeps submit btn disabled when review is too short', () => {
    renderComponent();

    const stars = screen.getAllByTestId('star-rating');
    fireEvent.click(stars[4]);

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '짧은 리뷰' } });

    const submitBtn = screen.getByText('리뷰 등록');
    expect(submitBtn).toBeDisabled();
  });

  it('keeps submit button disabled when no stars selected', () => {
    renderComponent();

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '이사 서비스가 매우 만족스러웠습니다.' } });

    const submitBtn = screen.getByText('리뷰 등록');
    expect(submitBtn).toBeDisabled();
  });

  it('successfully submits reveiw and close modal', async () => {
    (postReviewData as jest.Mock).mockResolvedValueOnce({});
    renderComponent();

    const stars = screen.getAllByTestId('star-rating');
    fireEvent.click(stars[4]);

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '이사 서비스가 매우 만족스러웠습니다!' } });

    const submitBtn = screen.getByText('리뷰 등록');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(postReviewData).toHaveBeenCalledWith(
        mockEstimation.estimationInfo.estimationId,
        '이사 서비스가 매우 만족스러웠습니다!',
        5,
      );
    });

    expect(mockAlert).toHaveBeenCalledWith('리뷰 등록이 완료되었습니다.');
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('handles review submission failure', async () => {
    (postReviewData as jest.Mock).mockRejectedValueOnce(new Error('Failed to submit review'));
    renderComponent();

    const stars = screen.getAllByTestId('star-rating');
    fireEvent.click(stars[4]);

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '이사 서비스가 매우 만족스러웠습니다!' } });

    const submitBtn = screen.getByText('리뷰 등록');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('리뷰 등록이 실패했습니다.');
    });
    expect(mockSetIsModalOpen).not.toHaveBeenCalled();
  });
});

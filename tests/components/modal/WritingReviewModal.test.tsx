import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import WritingReviewModal from '@/components/modal/WritingReviewModal';

// Mock the external dependencies
jest.mock('@/api/ReviewService', () => ({
  postReviewData: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ onClick, alt }: any) => <img onClick={onClick} alt={alt} data-testid="star-image" />,
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
    queryClient = new QueryClient();
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
  });

  it('enables submit button when valid input is provided', () => {
    renderComponent();

    const stars = screen.getAllByAltText('star');
    fireEvent.click(stars[4]);

    const textarea = screen.getByPlaceholderText('최소 10자 이상 입력해주세요');
    fireEvent.change(textarea, { target: { value: '이사 서비스가 매우 만족스러웠습니다!' } });

    const submitButton = screen.getByText('리뷰 등록');
    expect(submitButton).not.toBeDisabled();
  });
});

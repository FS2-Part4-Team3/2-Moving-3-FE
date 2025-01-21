import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getDibsDriverListData } from '@/api/DriverService';
import DibsDriverCard from '@/components/cards/DibsDriverCard';

jest.mock('@/api/DriverService', () => ({
  getDibsDriverListData: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/chips/SmallMovingTypeChips', () => {
  return function MockSmallMovingTypeChips({ type }: { type: string }) {
    return <div data-testid="moving-type-chip">{type}</div>;
  };
});

describe('DibsDriverCard', () => {
  const mockDriverData = [
    {
      id: 'driver-1',
      serviceType: ['HOME', 'SMALL'],
      introduce: '안녕하세요, 저는 경험이 많은 드라이버입니다.',
      image: 'http://placehold.it/56x56',
      name: '홍길동',
      favoriteCount: 10,
      score: 4.5,
      reviewCount: 20,
      career: 5,
      applyCount: 15,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (getDibsDriverListData as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<DibsDriverCard />);
    expect(screen.getByText('로딩중 ...')).toBeInTheDocument();
  });

  it('shows error message when API call fails', async () => {
    (getDibsDriverListData as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<DibsDriverCard />);

    await waitFor(() => {
      expect(screen.getByText('데이터를 가져오는데에 실패했습니다.')).toBeInTheDocument();
    });
  });

  it('shows empty state message when no drivers exist', async () => {
    (getDibsDriverListData as jest.Mock).mockResolvedValue([]);

    render(<DibsDriverCard />);

    await waitFor(() => {
      expect(screen.getByText('찜한 기사님이 없습니다.')).toBeInTheDocument();
    });
  });

  it('renders driver information correctly when API call succeeds', async () => {
    (getDibsDriverListData as jest.Mock).mockResolvedValue(mockDriverData);

    render(<DibsDriverCard />);

    await waitFor(() => {
      const chips = screen.getAllByTestId('moving-type-chip');
      expect(chips).toHaveLength(mockDriverData[0].serviceType.length);
      mockDriverData[0].serviceType.forEach((type, index) => {
        expect(chips[index]).toHaveTextContent(type);
      });

      expect(screen.getByText(mockDriverData[0].introduce)).toBeInTheDocument();

      expect(screen.getByText(`${mockDriverData[0].name} 기사님`)).toBeInTheDocument();
      expect(screen.getByText(mockDriverData[0].favoriteCount.toString())).toBeInTheDocument();
      expect(screen.getByText(mockDriverData[0].score.toString())).toBeInTheDocument();
      expect(screen.getByText(`(${mockDriverData[0].reviewCount})`)).toBeInTheDocument();
      expect(screen.getByText(`${mockDriverData[0].career}년`)).toBeInTheDocument();
      expect(screen.getByText(`${mockDriverData[0].applyCount}건`)).toBeInTheDocument();

      const profileImage = screen.getByAltText('profile');
      expect(profileImage).toHaveAttribute('src', mockDriverData[0].image);
      expect(screen.getByAltText('like')).toBeInTheDocument();
      expect(screen.getByAltText('star')).toBeInTheDocument();
    });
  });
});

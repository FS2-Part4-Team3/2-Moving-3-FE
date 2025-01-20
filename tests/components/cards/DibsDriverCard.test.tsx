import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DibsDriverCard from '@/components/cards/DibsDriverCard';

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
  const mockData = {
    id: 'driver-1',
    serviceType: ['HOME', 'SMALL'] as ('SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING')[],
    introduce: '안녕하세요, 저는 경험이 많은 드라이버입니다.',
    image: 'http://placehold.it/56x56',
    name: '홍길동',
    favoriteCount: 10,
    score: 4.5,
    reviewCount: 20,
    career: 5,
    applyCount: 15,
  };

  it('render service type chip correctly', () => {
    render(<DibsDriverCard data={mockData} />);

    const chips = screen.getAllByTestId('moving-type-chip');
    expect(chips).toHaveLength(mockData.serviceType.length);
    mockData.serviceType.forEach((type, index) => {
      expect(chips[index]).toHaveTextContent(type);
    });
  });

  it('render driver introduction text', () => {
    render(<DibsDriverCard data={mockData} />);

    const intro = screen.getByText(mockData.introduce);
    expect(intro).toBeInTheDocument();
  });

  it('render driver profile information correctly', () => {
    render(<DibsDriverCard data={mockData} />);

    expect(screen.getByText(`${mockData.name} 기사님`)).toBeInTheDocument();
    expect(screen.getByText(mockData.favoriteCount)).toBeInTheDocument();
    expect(screen.getByText(mockData.score)).toBeInTheDocument();
    expect(screen.getByText(`(${mockData.reviewCount})`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.career}년`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.applyCount}건`)).toBeInTheDocument();
  });

  it('render all images with correct attributes', () => {
    render(<DibsDriverCard data={mockData} />);

    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toHaveAttribute('src', mockData.image);

    const likeIcon = screen.getByAltText('like');
    expect(likeIcon).toBeInTheDocument();

    const startIcon = screen.getByAltText('star');
    expect(startIcon).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<DibsDriverCard data={mockData} />);
    expect(container).toMatchSnapshot();
  });
});

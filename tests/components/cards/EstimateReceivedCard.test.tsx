import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import heart from '@/../public/assets/driver/ic_empty_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { priceFormat } from '@/utils/Format';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/chips/MovingTypeChips', () => {
  return function MockMovingTypeChips({ type }: { type: string }) {
    return <div data-testid="moving-type-chips">{type}</div>;
  };
});

jest.mock('@/utils/Format', () => ({
  priceFormat: (price: number) => price.toLocaleString(),
}));

describe('Estimate received card', () => {
  const mockData = {
    id: '123',
    moveInfo: {
      id: '456',
      type: 'HOME' as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING',
    },
    comment: '이사 견적입니다.',
    driver: {
      id: 'driver-1',
      image: '/mock-image.jpg',
      name: '홍길동',
      applyCount: 50,
      favoriteCount: 150,
      score: 4.8,
      reviewCount: 238,
      career: 5,
    },
    price: 350000,
  };

  it('render all component correctly', () => {
    render(<EstimateReceivedCard data={mockData} />);
    expect(screen.getByTestId('moving-type-chips')).toBeInTheDocument();

    expect(screen.getByText(`${mockData.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.driver.name} 기사님`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.driver.favoriteCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.driver.score}`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockData.driver.reviewCount})`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.driver.career}년`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.driver.applyCount}건`)).toBeInTheDocument();

    expect(screen.getByText(`${priceFormat(mockData.price)}원`)).toBeInTheDocument();
  });

  it('renders all required images', () => {
    render(<EstimateReceivedCard data={mockData} />);

    const profileImages = screen.getAllByAltText('profile');
    expect(profileImages).toHaveLength(2);
    profileImages.forEach(img => {
      expect(img).toHaveAttribute('src', '/mock-image.jpg');
    });

    expect(screen.getByAltText('heart')).toBeInTheDocument();
    expect(screen.getAllByAltText('star')).toHaveLength(2);
  });
});

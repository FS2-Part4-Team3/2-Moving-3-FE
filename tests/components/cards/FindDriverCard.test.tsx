import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FindDriverCard from '@/components/cards/FindDriverCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/chips/MovingTypeChips', () => {
  return function MockMovingTypeChips({ type }: { type: any }) {
    return <div data-testid={`moving-type-chip-${type}`}>{type}</div>;
  };
});

describe('Find driver card', () => {
  const mockData = {
    id: '123',
    introduce: '안녕하세요 홍길동입니다',
    image: '/mock-image.jpg',
    name: '홍길동',
    likeCount: 42,
    rating: 3.9,
    reviewCount: 123,
    career: 5,
    applyCount: 999,
    serviceType: ['SMALL', 'HOME'],
  };

  it('render basic driver information correctly', () => {
    render(<FindDriverCard data={mockData} />);

    expect(screen.getByText(`${mockData.introduce}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.name} 기사님`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.likeCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockData.reviewCount})`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.career}년`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.applyCount}건`)).toBeInTheDocument();
  });

  it('render all service type chips', () => {
    render(<FindDriverCard data={mockData} />);

    expect(screen.getByTestId('moving-type-chip-SMALL')).toBeInTheDocument();
    expect(screen.getByTestId('moving-type-chip-HOME')).toBeInTheDocument();
  });

  it('render WAITING status chip when type is WAITING', () => {
    render(<FindDriverCard data={mockData} type="WAITING" />);

    expect(screen.getByTestId('moving-type-chip-WAITING')).toBeInTheDocument();
  });

  it('render RECEIVED status chip when type is RECEIVED', () => {
    render(<FindDriverCard data={mockData} type="RECEIVED" />);

    expect(screen.getByTestId('moving-type-chip-RECEIVED')).toBeInTheDocument();
  });

  it('render responsive driver images', () => {
    render(<FindDriverCard data={mockData} />);

    const desktopImage = screen.getAllByAltText('driver')[0];
    const mobileImage = screen.getAllByAltText('driver')[1];

    expect(desktopImage).toHaveAttribute('width', '56');
    expect(mobileImage).toHaveAttribute('width', '46');
  });

  it('render like and star icon', () => {
    render(<FindDriverCard data={mockData} />);

    expect(screen.getByAltText('like')).toBeInTheDocument();

    const stars = screen.getAllByAltText(/star/);
    expect(stars).toHaveLength(2);
  });

  it('handles data without image', () => {
    const dataWithoutImage = { ...mockData, image: undefined };
    render(<FindDriverCard data={dataWithoutImage} />);

    expect(screen.queryAllByAltText('driver')).toHaveLength(0);
  });
});

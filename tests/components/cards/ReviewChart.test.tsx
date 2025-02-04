import { render, screen } from '@testing-library/react';
import ReviewChart from '@/components/cards/ReviewChart';
import type { ReviewChartProps } from '@/interfaces/Card/ReviewChartInterface';

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

describe('ReviewChart Component', () => {
  const mockData: ReviewChartProps = {
    data: {
      ratingCounts: [10, 20, 30, 25, 15], // 1점:10, 2점:20, 3점:30, 4점:25, 5점:15
      averageRating: 3.8,
    },
    totalCount: 100,
  };

  it('renders average rating correctly', () => {
    render(<ReviewChart {...mockData} />);

    expect(screen.getByText('3.8')).toBeInTheDocument();
    expect(screen.getByText('/ 5')).toBeInTheDocument();
  });

  it('renders star ratings correctly', () => {
    render(<ReviewChart {...mockData} />);

    const yellowStars = screen.getAllByAltText('Yellow Star');
    const grayStars = screen.getAllByAltText('Gray Star');

    expect(yellowStars.length).toBe(4); // 3.8점 → 반올림하면 4점
    expect(grayStars.length).toBe(1);
  });

  it('renders rating distribution correctly', () => {
    render(<ReviewChart {...mockData} />);

    expect(screen.getByText('5점')).toBeInTheDocument();
    expect(screen.getByText('4점')).toBeInTheDocument();
    expect(screen.getByText('3점')).toBeInTheDocument();
    expect(screen.getByText('2점')).toBeInTheDocument();
    expect(screen.getByText('1점')).toBeInTheDocument();

    expect(screen.getByText('15')).toBeInTheDocument(); // 5점 개수
    expect(screen.getByText('25')).toBeInTheDocument(); // 4점 개수
    expect(screen.getByText('30')).toBeInTheDocument(); // 3점 개수
    expect(screen.getByText('20')).toBeInTheDocument(); // 2점 개수
    expect(screen.getByText('10')).toBeInTheDocument(); // 1점 개수
  });

  it('handles totalCount being 0', () => {
    render(<ReviewChart data={{ ratingCounts: [0, 0, 0, 0, 0], averageRating: 0 }} totalCount={0} />);

    expect(screen.getByText('0.0')).toBeInTheDocument();
    const bars = screen.getAllByRole('presentation'); // width 스타일 체크를 위해 역할 부여 가능
    bars.forEach(bar => {
      expect(bar).toHaveStyle('width: 0%');
    });
  });
});

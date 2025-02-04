import { render, screen, within } from '@testing-library/react';
import ReviewChart from '@/components/cards/ReviewChart';
import type { ReviewChartProps } from '@/interfaces/Card/ReviewChartInterface';

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

describe('ReviewChart Component', () => {
  const mockData: ReviewChartProps = {
    data: {
      ratingCounts: [10, 20, 30, 25, 15],
      averageRating: 3.8,
    },
    totalCount: 100,
  };

  it('renders average rating correctly', () => {
    render(<ReviewChart {...mockData} />);
    const chartElement = screen.getByTestId('main-chart');

    expect(chartElement).toHaveTextContent('3.8');
    expect(chartElement).toHaveTextContent('/ 5');
  });

  it('renders star ratings correctly', () => {
    render(<ReviewChart {...mockData} />);
    const chartElement = screen.getByTestId('main-chart');

    const yellowStars = within(chartElement).getAllByAltText('Yellow Star');
    const grayStars = within(chartElement).getAllByAltText('Gray Star');

    expect(yellowStars.length).toBe(4);
    expect(grayStars.length).toBe(1);
  });

  it('renders rating distribution correctly', () => {
    render(<ReviewChart {...mockData} />);
    const chartElement = screen.getByTestId('main-chart');

    expect(within(chartElement).getByText('5점')).toBeInTheDocument();
    expect(within(chartElement).getByText('4점')).toBeInTheDocument();
    expect(within(chartElement).getByText('3점')).toBeInTheDocument();
    expect(within(chartElement).getByText('2점')).toBeInTheDocument();
    expect(within(chartElement).getByText('1점')).toBeInTheDocument();

    expect(within(chartElement).getByText('15')).toBeInTheDocument();
    expect(within(chartElement).getByText('25')).toBeInTheDocument();
    expect(within(chartElement).getByText('30')).toBeInTheDocument();
    expect(within(chartElement).getByText('20')).toBeInTheDocument();
    expect(within(chartElement).getByText('10')).toBeInTheDocument();
  });

  it('renders correctly when some ratings are 0', () => {
    const mockPartialZeroData = {
      data: {
        ratingCounts: [0, 10, 0, 30, 20], // 1점, 3점은 0개
        averageRating: 3.6,
      },
      totalCount: 60,
    };

    render(<ReviewChart {...mockPartialZeroData} />);
    const chartElement = screen.getByTestId('main-chart');

    const bars = chartElement.querySelectorAll('.bg-yellow-100');
    expect(bars.length).toBeGreaterThan(0);

    if (bars.length >= 5) {
      expect(bars[4]).toHaveStyle('width: 0%'); // 1점
      expect(bars[2]).toHaveStyle('width: 0%'); // 3점

      expect(bars[3]).not.toHaveStyle('width: 0%'); // 2점
      expect(bars[1]).not.toHaveStyle('width: 0%'); // 4점
      expect(bars[0]).not.toHaveStyle('width: 0%'); // 5점
    }
  });
});

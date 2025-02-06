import { render, screen } from '@testing-library/react';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import type { DriverReviewCardProps } from '@/interfaces/Card/DriverReviewCardInterface';
import { DateFormatToYYYYMMDD } from '@/utils/Format';
import { maskName } from '@/utils/mask';

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

describe('DriverReviewCard Component', () => {
  const mockReview: DriverReviewCardProps['review'] = {
    id: 'review-test',
    owner: { name: '김재원' },
    createdAt: '2024-02-06T12:00:00Z',
    updatedAt: '2024-02-06T13:00:00Z',
    score: 4,
    comment: '이사 기사님이 너무 친절하셨어요!',
  };

  // it('이름이 마스킹되어 표시됨', () => {
  //   render(<DriverReviewCard review={mockReview} />);
  //   const maskedName = maskName(mockReview.owner.name);
  //   expect(screen.getByText(maskedName)).toBeInTheDocument();
  // });

  // it('작성 날짜가 YYYY-MM-DD 포맷으로 표시됨', () => {
  //   render(<DriverReviewCard review={mockReview} />);
  //   const formattedDate = DateFormatToYYYYMMDD(mockReview.createdAt);
  //   expect(screen.getByText(formattedDate)).toBeInTheDocument();
  // });

  it('별점이 올바르게 렌더링됨', () => {
    render(<DriverReviewCard review={mockReview} />);

    const starImages = screen.getAllByRole('img') as HTMLImageElement[];

    const yellowStars = starImages.filter(img => img.alt === 'Yellow Star');
    const grayStars = starImages.filter(img => img.alt === 'Gray Star');

    expect(yellowStars.length).toBe(4);
    expect(grayStars.length).toBe(1);
  });

  it('리뷰 코멘트가 정상적으로 표시됨', () => {
    render(<DriverReviewCard review={mockReview} />);
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});

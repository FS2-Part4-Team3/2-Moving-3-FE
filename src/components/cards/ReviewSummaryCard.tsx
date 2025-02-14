import { useQuery } from '@tanstack/react-query';
import { getReviewSummaryDetail } from '@/api/AiService';
import { ReviewSummaryCardProps, ReviewSummaryResponse } from '@/interfaces/Card/ReviewSummaryCardInterface';

export default function ReviewSummaryCard({ driverId }: ReviewSummaryCardProps) {
  const {
    data: reviewSummaryData,
    isLoading: reviewSummaryLoading,
    isError: reviewSummaryError,
  } = useQuery<ReviewSummaryResponse>({
    queryKey: ['reviewSummaryData', driverId],
    queryFn: () => getReviewSummaryDetail(driverId),
  });

  console.log(reviewSummaryData);

  return (
    <div className="bg-background-200 rounded-[3.2rem] flex flex-col gap-[0.8rem] py-[2rem] px-[3rem]">
      <div className="flex gap-[3rem]">
        <p className="font-semibold text-[2rem] leading-[3.2rem] text-gray-400">리뷰 요약</p>
        <p
          className={`leading-[3.2rem] ${reviewSummaryData?.summaryReview ? 'font-semibold text-[2rem] text-black-400' : 'text-medium text-[2rem] text-red-200'}`}
        >
          {reviewSummaryData?.summaryReview || '생성된 리뷰가 존재하지 않습니다.'}
        </p>
      </div>
      <p className="font-semibold text-[1.8rem] text-red-200">*해당 정보는 매일 자정에 갱신됩니다.</p>
    </div>
  );
}

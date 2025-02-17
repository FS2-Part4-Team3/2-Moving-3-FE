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

  if (reviewSummaryLoading) {
    return <div>Loading ...</div>;
  }

  if (reviewSummaryError) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-background-200 rounded-[3.2rem] flex flex-col gap-[1.6rem] py-[2rem] px-[3rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <p className="md:font-semibold md:text-[2rem] md:leading-[3.2rem] sm:font-bold sm:text-[1.6rem] sm:leading-[2.6rem] text-gray-400">
          리뷰 요약
        </p>
        <p className="md:leading-[3.2rem] sm:leading-[2.6rem] md:font-semibold sm:font-bold md:text-[2rem] sm:text-[1.6rem] text-black-400">
          {reviewSummaryData?.summaryReview || '생성된 리뷰가 존재하지 않습니다.'}
        </p>
      </div>
      <p className="md:font-semibold md:text-[1.8rem] sm:font-bold sm:text-[1.6rem] text-red-200">
        *해당 정보는 매일 자정에 갱신됩니다.
      </p>
    </div>
  );
}

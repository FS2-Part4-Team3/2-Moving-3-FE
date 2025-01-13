import type { DriverReviewCardProps } from '@/interfaces/Card/DriverReviewCardInterface';

export default function DriverReviewCard({ reviewCount, reviews }: DriverReviewCardProps) {
  return (
    <>
      <div className="flex flex-col py-[3.2rem] lg:gap-[2.4rem] sm:gap-[1.6rem] border-b border-line-100">
        <div className="flex flex-col gap-[0.8rem]">
          <div className="lg:gap-[1.4rem] sm:gap-[1.2rem] flex flex-row items-center">
            <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-black-400">
              {review.owner}
            </div>
            <div className="border-l border-line-200 lg:h-[1.4rem] sm:h-[1.2rem]"></div>
            <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-gray-300">
              {review.createdAt}
            </div>
          </div>
          <div>{review.score}</div>
        </div>
        <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-[#2B2B2B]">
          {review.comment}
        </div>
      </div>
    </>
  );
}

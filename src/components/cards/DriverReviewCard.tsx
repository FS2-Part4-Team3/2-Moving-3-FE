import Image from 'next/image';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import type { DriverReviewCardProps } from '@/interfaces/Card/DriverReviewCardInterface';
import { DateFormatToYYYYMMDD } from '@/utils/Format';
import { maskName } from '@/utils/mask';

export default function DriverReviewCard({ review }: DriverReviewCardProps) {
  const renderStars = (score: number) => {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={i}
            src={i < score ? star_yellow : star_gray}
            alt={i < score ? 'Yellow Star' : 'Gray Star'}
            width={20}
            height={20}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col py-[3.2rem] lg:gap-[2.4rem] sm:gap-[1.6rem] border-b border-line-100">
        <div className="flex flex-col gap-[0.8rem]">
          <div className="lg:gap-[1.4rem] sm:gap-[1.2rem] flex flex-row items-center">
            <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-black-400 dark:text-dark-t">
              {maskName(review.owner.name)}
            </div>
            <div className="border-l border-line-200 lg:h-[1.4rem] sm:h-[1.2rem]"></div>
            <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-gray-300">
              {DateFormatToYYYYMMDD(review.createdAt)}
            </div>
          </div>
          <div className="flex flex-row">{renderStars(review.score)}</div>
        </div>
        <div className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-[#2B2B2B] dark:text-dark-t">
          {review.comment}
        </div>
      </div>
    </div>
  );
}

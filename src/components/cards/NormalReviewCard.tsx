'use client';

import Image from 'next/image';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import type { ReviewCardProps } from '@/interfaces/Card/NormalReviewCardInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';

export default function NormalReviewCard({ estimation, type, review }: ReviewCardProps) {
  const renderStars = (score: number) => {
    const totalStars = 5;
    const emptyStars = totalStars - score;
    const fullStars = score;

    const stars = [...Array(fullStars).fill(star_yellow), ...Array(emptyStars).fill(star_gray)];

    return stars.map((star, index) => <Image key={index} src={star} alt="star" width={20} height={20} />);
  };

  return (
    <div
      key={estimation.id}
      className="lg:w-[68.6rem] lg:h-[34.6rem] md:w-[60rem] md:h-[20.8rem] sm:w-[32.7rem] sm:h-[20.8rem] rounded-[2.4rem] lg:px-[2.4rem] lg:py-[3.2rem] md:px-[2rem] md:py-[2rem] sm:px-[1.4rem] sm:py-[2rem] bg-white border-none flex flex-col shadow-custom3"
    >
      <div className="flex flex-row items-center lg:gap-[1.2rem] md:gap-[0.8rem] sm:gap-[0.8rem] lg:w-[64rem] ">
        <MovingTypeChips type={estimation.moveInfo.type} />

        {type === 'MY' && (
          <span className="lg:flex md:hidden sm:hidden lg:text-[1.8rem] font-normal text-gray-300 items-center ml-auto">
            작성일 {DateWithoutDayWeeKFormat(review.createdAt)}
          </span>
        )}
      </div>
      <div className="flex lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.2rem] items-center lg:w-[64rem] lg:h-[12.8rem] rounded-[0.6rem] border lg:px-[1.8rem] lg:py-[1.6rem] md:px-[0.8rem] md:py-[1.3rem] sm:px-0 sm:py-[1.3rem] bg-white border-line-100 lg:mt-[2.4rem] md:mt-[1.4rem] sm:mt-[1.4rem] lg:mb-[3.2rem] md:mb-[1.4rem] sm:mb-[1.4rem] ">
        <div className="lg:w-[9.6rem] lg:h-[9.6rem] md:w-[4.6rem] md:h-[4.6rem] sm:w-[4.6rem] sm:h-[4.6rem] relative ">
          <Image src={estimation.driver.image} alt={estimation.driver.name} fill />
        </div>
        <div className={`flex flex-col ${type === 'MY' ? 'gap-0' : 'lg:gap-[1.6rem] md:gap-[0.6rem] sm:gap-[0.6rem]'}`}>
          <h1
            className={`lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold text-black-300 ${type === 'MY' ? 'lg:mb-[0.8rem] md:mb-[0.6rem] sm:mb-[0.6rem]' : ''}`}
          >
            {estimation.driver.name} 기사님
          </h1>
          <div
            className={`flex lg:gap-[1.6rem] md:gap-[1.25rem] sm:gap-[1.25rem] ${type === 'MY' ? 'lg:mb-[1.6rem] md:mb-[1.4rem] sm:mb-[1.4rem]' : ''}`}
          >
            <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
              <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">이사일</h2>
              <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-black-400 ">
                {DateWithoutDayWeeKFormat(estimation.moveInfo.date)}
              </span>
            </div>
            <div className="w-[0.1rem] lg:h-[1.6rem] md:h-[1.4rem] sm:h-[1.4rem] rounded-[10rem] bg-line-200 "></div>
            <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
              <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">견적가</h2>
              <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-black-400 ">
                {priceFormat(estimation.price)}원
              </span>
            </div>
          </div>
          {type === 'MY' && <div className="lg:flex md:hidden sm:hidden">{renderStars(review.score)}</div>}
        </div>
      </div>
      {type === 'ABLE' && (
        <ButtonWrapper id="review_card-btn">
          <ButtonWrapper.Button className="lg:w-[64rem] lg:h-[6.4rem] md:w-[56rem] md:h-[3.8rem] sm:w-[29.9rem] sm:h-[4.8rem] lg:rounded-[1.6rem] md:rounded-[0.8rem] sm:rounded-[0.8rem] p-[1.6rem] bg-blue-300 text-center lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white ">
            리뷰 작성하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {type === 'MY' && (
        <div className="flex flex-col">
          <span className="lg:text-[2rem] font-normal text-gray-500">{review.comment}</span>
          <span className="lg:hidden md:block sm:block text-[1.2rem] font-normal text-gray-300 self-end">
            작성일 {DateWithoutDayWeeKFormat(review.createdAt)}
          </span>
        </div>
      )}
    </div>
  );
}

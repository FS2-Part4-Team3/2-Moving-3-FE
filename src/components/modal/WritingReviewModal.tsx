'use client';

import Image from 'next/image';
import { useState } from 'react';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import type { WritingReviewModalProps } from '@/interfaces/Modal/WritingReveiwModalInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ModalWrapper } from '../common/headless/Modal';

export default function WritingReviewModal({ estimation, review }: WritingReviewModalProps) {
  const [isClosed, setIsClosed] = useState(false);
  const renderStars = (score: number) => {
    const totalStars = 5;
    const emptyStars = totalStars - score;
    const fullStars = score;

    const stars = [...Array(fullStars).fill(star_yellow), ...Array(emptyStars).fill(star_gray)];

    return stars.map((star, index) => <Image key={index} src={star} alt="star" width={40} height={40} />);
  };

  return (
    <div>
      <ModalWrapper onClose={() => setIsClosed(true)}>
        <ModalWrapper.Header>리뷰 쓰기</ModalWrapper.Header>
        <ModalWrapper.Content>
          <div>
            <div className="flex flex-row items-center lg:gap-[1.2rem] md:gap-[0.8rem] sm:gap-[0.8rem]">
              {estimation.moveInfo.type.map((type, index) => (
                <MovingTypeChips key={index} type={type} />
              ))}
            </div>
            <div className="flex lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.2rem] items-center lg:w-[56rem] lg:h-[12.8rem] rounded-[0.6rem] border lg:px-[1.8rem] lg:py-[1.6rem] md:px-[0.8rem] md:py-[1.3rem] sm:px-0 sm:py-[1.3rem] bg-white border-line-100 lg:mt-[2.4rem] md:mt-[1.4rem] sm:mt-[1.4rem] lg:mb-[3.2rem] md:mb-[1.4rem] sm:mb-[1.4rem] ">
              <div className="lg:w-[9.6rem] lg:h-[9.6rem] md:w-[4.6rem] md:h-[4.6rem] sm:w-[4.6rem] sm:h-[4.6rem] relative ">
                <Image src={estimation.driver.image} alt={estimation.driver.name} fill />
              </div>
              <div className="flex flex-col lg:gap-[1.6rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
                <h1 className="lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold text-black-300">
                  {estimation.driver.name} 기사님
                </h1>
                <div className="flex items-center lg:gap-[1.6rem] md:gap-[1.25rem] sm:gap-[1.25rem] ">
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
              </div>
            </div>
            <div className="flex flex-col gap-[1.6rem]">
              <span className="text-[2rem] font-semibold text-black-300 ">평점을 선택해 주세요</span>
              <div className="flex">{renderStars(review.score)}</div>
            </div>
            <div className="w-[56rem] h-[0.1rem] bg-line-100 lg:my-[3.2rem] "></div>
            <div className="flex flex-col gap-[1.6rem]">
              <span className="text-[2rem] font-semibold text-black-300 ">상세 후기를 작성해 주세요</span>
              <textarea
                className="resize-none w-[56rem] h-[16rem] rounded-[1.6rem] px-[2.4rem] py-[1.4rem] bg-background-200 focus:outline-none placeholder:text-[2rem] placeholder:text-gray-300 text-[2rem] font-normal"
                placeholder="최소 10자 이상 입력해주세요"
              ></textarea>
            </div>
          </div>
        </ModalWrapper.Content>
        <ModalWrapper.Footer isDisabled>리뷰 등록</ModalWrapper.Footer>
      </ModalWrapper>
    </div>
  );
}

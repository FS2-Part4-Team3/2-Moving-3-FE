'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import { postReviewData } from '@/api/ReviewService';
import type { WritingReviewModalProps } from '@/interfaces/Modal/WritingReveiwModalInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ModalWrapper } from '../common/headless/Modal';

export default function WritingReviewModal({ estimation, setIsModalOpen }: WritingReviewModalProps) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const postReviwMutaion = useMutation({
    mutationFn: async () => {
      await postReviewData(estimation.estimationInfo.estimationId, reviewText, selectedStars);
    },
    onSuccess: () => {
      alert('리뷰 등록이 완료되었습니다.');
    },
    onError: () => {
      alert('리뷰 등록이 실패했습니다.');
    },
  });

  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const renderStars = () => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <div className="lg:w-[4rem] lg:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[2rem] sm:h-[2rem] relative">
        <Image
          key={index}
          src={index < selectedStars ? star_yellow : star_gray}
          alt="star"
          fill
          onClick={() => handleStarClick(index)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    ));
  };

  return (
    <div>
      <ModalWrapper onClose={() => setIsModalOpen(false)}>
        <ModalWrapper.Header>리뷰 쓰기</ModalWrapper.Header>
        <ModalWrapper.Content>
          <div>
            <div className="flex flex-row items-center lg:gap-[1.2rem] md:gap-[0.8rem] sm:gap-[0.8rem] z-3">
              <MovingTypeChips type={estimation.moveInfo.serviceType} />
            </div>
            <div className="flex lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.2rem] items-center lg:w-[56rem] lg:h-[12.8rem] md:w-[32.7rem] sm:w-[32.7rem] rounded-[0.6rem] lg:border md:border-b sm:border-b lg:px-[1.8rem] lg:py-[1.6rem] md:px-[0.6rem] md:py-[0.2rem] sm:px-0 sm:py-[1rem] bg-white border-line-100 lg:mt-[2.4rem] md:mt-[1.4rem] sm:mt-[1.4rem] lg:mb-[3.2rem] md:mb-[1.4rem] sm:mb-[1.4rem] ">
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
                      {priceFormat(estimation.estimationInfo.price)}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[1.6rem]">
              <span className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-black-300 ">
                평점을 선택해 주세요
              </span>
              <div className="flex">{renderStars()}</div>
            </div>
            <div className="lg:w-[56rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.1rem] bg-line-100 lg:my-[3.2rem] md:my-[2rem] sm:my-[2rem] "></div>
            <div className="flex flex-col gap-[1.6rem]">
              <span className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-black-300 ">
                상세 후기를 작성해 주세요
              </span>
              <textarea
                className="resize-none lg:w-[56rem] lg:h-[16rem] md:w-[32.7rem] md:h-[16rem] sm:w-[32.7rem] sm:h-[16rem] rounded-[1.6rem] lg:px-[2.4rem] lg:py-[1.4rem] md:px-[1.6rem] md:py-[1.4rem] bg-background-200 focus:outline-none placeholder:text-[2rem] placeholder:text-gray-300 text-[2rem] font-normal"
                placeholder="최소 10자 이상 입력해주세요"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              ></textarea>
            </div>
          </div>
        </ModalWrapper.Content>
        <ModalWrapper.Footer isDisabled={selectedStars === 0 || reviewText.length < 10} onClick={() => postReviwMutaion.mutate()}>
          리뷰 등록
        </ModalWrapper.Footer>
      </ModalWrapper>
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { AddressCardProps } from '@/interfaces/Card/AddressCardInterface';
import { ButtonWrapper } from '../common/headless/Button';
import AddressModal from '../modal/AddressModal';

export default function AddressCard({ regions, setRegions, handleSubmit }: AddressCardProps) {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isArrivalModalOpen, setIsArrivalModalOpen] = useState(false);

  return (
    <>
      <div className="lg:w-[62.4rem] md:w-[32.7rem] sm:w-[32.7rem] lg:p-[3.2rem] md:p-[3.2rem] sm:p-[1.6rem] flex flex-col lg:gap-[2.1rem] sm:gap-[0.8rem] rounded-[3.2rem] rounded-tr-none border-none bg-white dark:bg-dark-p">
        <div className="flex flex-col lg:gap-[1.6rem] md:gap-[1.6rem] sm:gap-[0.8rem]">
          <span className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 dark:text-dark-t">
            출발지
          </span>
          <div
            onClick={() => setIsStartModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[4rem] rounded-[1.6rem] border border-blue-300 text-center lg:py-[1.6rem] md:py-[1.6rem] sm:py-[0.8rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-blue-300 cursor-pointer dark:bg-dark-bg"
          >
            {regions.start || '출발지 선택하기'}
          </div>
          {regions.start && (
            <p
              onClick={() => {
                setIsArrivalModalOpen(true);
                setRegions(prev => ({ ...prev, start: '' }));
              }}
              className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 underline self-end"
            >
              수정하기
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[1.6rem] sm:gap-[0.8rem]">
          <div className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 dark:text-dark-t">
            도착지
          </div>
          <div
            onClick={() => setIsArrivalModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[4rem] rounded-[1.6rem] border border-blue-300 text-center lg:py-[1.6rem] md:py-[1.6rem] sm:py-[0.8rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-blue-300 cursor-pointer dark:bg-dark-bg"
          >
            {regions.arrival || '도착지 선택하기'}
          </div>
          {regions.arrival && (
            <p
              onClick={() => {
                setIsArrivalModalOpen(true);
                setRegions(prev => ({ ...prev, arrival: '' }));
              }}
              className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 underline self-end mb-[1rem]"
            >
              수정하기
            </p>
          )}
        </div>
        <ButtonWrapper id="quote-request-btn" onClick={handleSubmit}>
          <ButtonWrapper.Button
            disabled={!(regions.start && regions.arrival)}
            className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[4.6rem] rounded-[1.6rem] p-[1.6rem] sm:p-0 bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white text-center"
          >
            견적 확정하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
      {isStartModalOpen && (
        <AddressModal
          handleModalClose={() => setIsStartModalOpen(false)}
          isStartModalOpen={isStartModalOpen}
          setRegions={setRegions}
        />
      )}
      {isArrivalModalOpen && (
        <AddressModal
          handleModalClose={() => setIsArrivalModalOpen(false)}
          isArrivalModalOpen={isArrivalModalOpen}
          setRegions={setRegions}
        />
      )}
    </>
  );
}

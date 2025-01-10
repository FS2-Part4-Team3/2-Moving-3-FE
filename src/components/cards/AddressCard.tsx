'use client';

import { useState } from 'react';
import type { AddressCardProps } from '@/interfaces/Card/AddressCardInterface';
import { ButtonWrapper } from '../common/headless/Button';
import AddressModal from '../modal/AddressModal';

export default function AddressCard({ regions, setRegions }: AddressCardProps) {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isArrivalModalOpen, setIsArrivalModalOpen] = useState(false);

  return (
    <>
      <div className="lg:w-[62.4rem] md:w-[32.7rem] sm:w-[32.7rem] p-[3.2rem] flex flex-col gap-[2.1rem] rounded-[3.2rem] rounded-tr-none border-none bg-white">
        <div className="flex flex-col gap-[1.6rem]">
          <span className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400">출발지</span>
          <div
            onClick={() => setIsStartModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[5.4rem] rounded-[1.6rem] border border-blue-300 px-[2.4rem] py-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-blue-300 cursor-pointer"
          >
            {regions.start ? regions.start : '출발지 선택하기'}
          </div>
          {regions.start && (
            <div
              onClick={() => {
                setIsArrivalModalOpen(true);
                setRegions(prev => ({ ...prev, start: '' }));
              }}
              className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 underline self-end"
            >
              수정하기
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400">도착지</div>
          <div
            onClick={() => setIsArrivalModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[5.4rem] rounded-[1.6rem] border border-blue-300 px-[2.4rem] py-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-blue-300 cursor-pointer"
          >
            {regions.arrival ? regions.arrival : '도착지 선택하기'}
          </div>
          {regions.arrival && (
            <div
              onClick={() => {
                setIsArrivalModalOpen(true);
                setRegions(prev => ({ ...prev, arrival: '' }));
              }}
              className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 underline self-end mb-[1rem]"
            >
              수정하기
            </div>
          )}
        </div>
        <ButtonWrapper id="quote-request-btn">
          <ButtonWrapper.Button className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white text-center">
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

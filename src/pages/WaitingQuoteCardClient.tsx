'use client';

import { ButtonWrapper } from '@/components/common/headless/Button';

export default function WaitingQuoteCardClient() {
  return (
    <div className="w-full flex gap-[1.1rem]">
      <ButtonWrapper id="confirm-quote-button">
        <ButtonWrapper.Button className="h-[6.4rem] rounded-[1.6rem] p-[1.6rem] w-full font-semibold text-[2rem] leading-[3.2rem] text-white">
          견적 확정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="view-detail-button">
        <ButtonWrapper.Button className="border border-blue-300 bg-white h-[6.4rem] rounded-[1.6rem] py-[1.6rem] px-[2.4rem] w-full font-semibold text-[2rem] leading-[3.2rem] text-blue-300">
          상세보기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
